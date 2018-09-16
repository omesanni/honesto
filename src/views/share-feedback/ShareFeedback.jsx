import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get, isEqual } from 'lodash';
import classnames from 'classnames';
import { CURRENT_USER_ID, PERIOD_OPTIONS, QUESTIONS } from './constants';
import * as modalActions from '../../shared/modals/actions';
import * as teamMembersActions from '../../shared/team-members/actions';
import * as shareFeedbackActions from './actions';
import Modal from '../../components/Modal';
import Scale from '../../components/Scale';
import TeamMembers from '../../components/TeamMembers';
import FeedbackWizard from './FeedbackWizard';

const CURRENT_MONTH = PERIOD_OPTIONS.find(o => o.id === new Date().getMonth() + 1).id;

class ShareFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.modalId = 'submission-modal';

    this.state = {
      selectedPeriod: CURRENT_MONTH,
      feedbackWizardCompleted: false,
      showFeedBackWizard: false,
      selectedTeamMember: undefined,
      questions: props.feedback.questions,
    };

    this.setQuestions = this.setQuestions.bind(this);
    this.hasGivenFeedBackToMember = this.hasGivenFeedBackToMember.bind(this);
    this.renderViewSubmissionModal = this.renderViewSubmissionModal.bind(this);
    this.renderTeamMembersList = this.renderTeamMembersList.bind(this);
    this.renderFeedBackCompletedView = this.renderFeedBackCompletedView.bind(this);
    this.toggleFeedbackWizard = this.toggleFeedbackWizard.bind(this);
    this.handleFeedBackSubmission = this.handleFeedBackSubmission.bind(this);
    this.handleViewFeedbackSubmission = this.handleViewFeedbackSubmission.bind(this);
    this.handleResponseGivenToQuestions = this.handleResponseGivenToQuestions.bind(this);
    this.renderRelevantResponseInSubmissionModal =
      this.renderRelevantResponseInSubmissionModal.bind(this);
  }

  componentDidMount() {
    this.props.actions.setQuestions(QUESTIONS);
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props.feedback;
    const { questions: prevQuestions } = prevProps.feedback;

    if (!isEqual(questions, prevQuestions)) {
      this.setQuestions(questions);
    }
  }

  /**
   * Set questions in state
   * @param {Array} questions
   */
  setQuestions(questions) {
    this.setState(() => ({ questions }));
  }

  /**
   * Check if user has given feedback to a particular team member
   * @param  {Object}  member
   * @return {Boolean}
   */
  hasGivenFeedBackToMember(member) {
    const currentUser = member.teamFeedback.find(m => m.userId === CURRENT_USER_ID);

    if (!currentUser) {
      return false;
    }

    const feedback = get(currentUser, ['feedback'], [])
      .find(f => f.period.id === this.state.selectedPeriod);

    return !!feedback;
  }

  /**
   * Handles response given by user going through feedback wizard
   * @param  {Number}       questionId
   * @param  {Array|String} response
   */
  handleResponseGivenToQuestions(questionId, response) {
    const newQuestions = this.state.questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, response };
      }

      return q;
    });

    this.setQuestions(newQuestions);
  }

  /**
   * Handles Feedback submission
   */
  handleFeedBackSubmission() {
    const period = {
      id: this.state.selectedPeriod,
      month: PERIOD_OPTIONS.find(o => o.id === this.state.selectedPeriod).month,
    };

    this.props.actions.updateTeamMemberFeedback(
      this.state.selectedTeamMember.id,
      CURRENT_USER_ID,
      this.state.questions,
      period,
    );

    this.toggleFeedbackWizard(undefined, true);
    this.setQuestions(this.props.feedback.questions);
  }

  /**
   * Shows feedback for a particular team member
   * @param  {Object} member
   */
  handleViewFeedbackSubmission(member) {
    this.setState(() => ({ selectedTeamMember: member }),
      () => this.props.actions.openModal(this.modalId));
  }

  /**
   * Show or hide feedback wizard
   * @param  {Object}  selectedTeamMember
   * @param  {Boolean} isWizardCompleted
   */
  toggleFeedbackWizard(selectedTeamMember, isWizardCompleted = false) {
    this.setState(prevState => ({
      showFeedBackWizard: !prevState.showFeedBackWizard,
      feedbackWizardCompleted: isWizardCompleted,
      selectedTeamMember,
    }));
  }

  /**
   * Renders view user sees when feedback wizard is completed
   * @return {JSX}
   */
  renderFeedBackCompletedView() {
    const members = this.props.teamMembers
      .filter(member => !this.hasGivenFeedBackToMember(member));

    return (
      <div>
        <h2>{'Thank you for sharing your feeedback!'}</h2>
        <p>{'Continue to give feedback to other team members.'}</p>

        <div className={'card'}>
          <TeamMembers members={members}>
            {member => (
              <div>
                {!this.hasGivenFeedBackToMember(member) && (
                  <button
                    className={'btn btn-primary w-100'}
                    onClick={() => this.toggleFeedbackWizard(member)}
                  >
                    {'Fill Out'}
                  </button>
                )}
              </div>
            )}
          </TeamMembers>
        </div>
      </div>
    );
  }

  /**
   * Renders list of team members
   * @return {JSX}
   */
  renderTeamMembersList() {
    return (
      <div className={'team-members'}>
        {this.state.feedbackWizardCompleted ? this.renderFeedBackCompletedView() : (
          <Fragment>
            <div className={'feedback-control'}>
              <h2 className={'feedback-control__title'}>
                {'Share Feedback'}
              </h2>

              <div className={'feedback-control__select form-group'}>
                <label htmlFor={'feedback-period'}>
                  {'Feedback Period'}
                </label>
                <select
                  id={'feedback-period'}
                  className={'form-control'}
                  defaultValue={this.state.selectedPeriod}
                  onChange={(e) => {
                    const { value } = e.target;

                    this.setState(() => ({
                      selectedPeriod: Number(value),
                    }));
                  }}
                >
                  {PERIOD_OPTIONS.map(opt => (
                    <option
                      key={opt.id}
                      value={opt.id}
                      disabled={opt.id > CURRENT_MONTH}
                    >
                      {opt.month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={'card'}>
              <TeamMembers members={this.props.teamMembers}>
                {member => (
                  <div>
                    {!this.hasGivenFeedBackToMember(member) ? (
                      <button
                        className={'btn btn-primary w-100'}
                        onClick={() => this.toggleFeedbackWizard(member)}
                      >
                        {'Fill Out'}
                      </button>
                    ) : (
                      <button
                        className={'btn w-100'}
                        onClick={() => this.handleViewFeedbackSubmission(member)}
                      >
                        {'View Submission'}
                      </button>
                    )}
                  </div>
                )}
              </TeamMembers>
            </div>
          </Fragment>
        )}
      </div>
    );
  }


  /**
   * Renders relevant response in view submission modal
   * @param  {Object} question
   * @return {JSX}
   */
  renderRelevantResponseInSubmissionModal(question) {
    if (question.type === 'multiple-choice') {
      return question.response.map(r => (
        <p key={r.id}>{r.text}</p>
      ));
    } else if (question.type === 'scale') {
      const [value, max] = question.response.split('/').map(Number);

      return (
        <Scale
          value={value}
          max={max}
          style={{ width: '10%', height: '30px' }}
          showLegend={false}
          readOnly
        />
      );
    }

    return <p>{question.response}</p>;
  }

  /**
   * Renders view submission modal
   * @return {JSX}
   */
  renderViewSubmissionModal() {
    const { selectedTeamMember } = this.state;
    const getFeedback = () => {
      const user = selectedTeamMember.teamFeedback.find(m => m.userId === CURRENT_USER_ID);

      if (!user) {
        return [];
      }

      const period = user.feedback.find(f => f.period.id === this.state.selectedPeriod);

      return period ? period.response : [];
    };

    return (
      <Modal id={this.modalId} className={'w-60'}>
        {selectedTeamMember && (
          <div className={'card'}>
            <div className={'list-group list-group-flush'}>
              <div className={'list-group-item'}>
                <h4>{`${selectedTeamMember.name}'s Feedback`}</h4>
              </div>
              {getFeedback().map(f => (
                <div className={'list-group-item'}>
                  <div className={'row'}>
                    <div className={'col'}>
                      <p
                        className={classnames({
                          'text-muted': f.skippable && !f.response,
                        })}
                      >
                        {f.question}
                      </p>
                      {(f.skippable && !f.response) && (
                        <span className={'badge badge-secondary light-gray-bg'}>
                          {'SKIPPED'}
                        </span>
                      )}
                    </div>
                    <div className={'col'}>
                      {this.renderRelevantResponseInSubmissionModal(f)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    );
  }

  render() {
    return (
      <section className={'shared-feedback-section'}>
        {this.state.showFeedBackWizard ? (
          <FeedbackWizard
            member={this.state.selectedTeamMember}
            questions={this.state.questions}
            onResponseGiven={this.handleResponseGivenToQuestions}
            onGoBack={() => this.toggleFeedbackWizard()}
            onSubmitFeedback={this.handleFeedBackSubmission}
          />
        ) : this.renderTeamMembersList()}

        {this.renderViewSubmissionModal()}
      </section>
    );
  }
}

ShareFeedback.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  feedback: PropTypes.shape({
    questions: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(state => ({
  teamMembers: state.get('teamMembers').toJS(),
  feedback: state.get('feedback').toJS(),
}), dispatch => ({
  actions: bindActionCreators({
    ...modalActions,
    ...teamMembersActions,
    ...shareFeedbackActions,
  }, dispatch),
}))(ShareFeedback);
