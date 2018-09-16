import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import backArrow from '../../images/back-arrow.svg';
import Meter from '../../components/Meter';
import Scale from '../../components/Scale';
import MultiChoiceOptions from '../../components/MultiChoiceOptions';

class FeedBackWizard extends Component {
  constructor() {
    super();

    this.state = {
      currentStep: 0,
    };

    this.showStep = this.showStep.bind(this);
    this.shouldDisableButton = this.shouldDisableButton.bind(this);
    this.isOnlyNextButtonShown = this.isOnlyNextButtonShown.bind(this);
    this.renderMeter = this.renderMeter.bind(this);
    this.renderReleventResponseControl = this.renderReleventResponseControl.bind(this);
  }

  /**
   * Determines whether or not to disable next button
   */
  shouldDisableButton() {
    const question = this.props.questions[this.state.currentStep];

    return question.skippable ? false : (!question.response || !question.response.length);
  }

  /**
   * Checks if only the `next` button is currently being displayed
   * @param  {Boolean}  questionIsSkippable checks if question is skippable
   * @return {Boolean}
   */
  isOnlyNextButtonShown(questionIsSkippable) {
    return this.state.currentStep === 0 && !questionIsSkippable;
  }

  /**
   * Displays the next step in feedback wizard
   * @param  {Number} index Position of step
   */
  showStep(index) {
    const { questions } = this.props;
    let newIndex = this.state.currentStep + index;

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex === questions.length) {
      newIndex = questions.length - 1;
    }

    this.setState(() => ({ currentStep: newIndex }));
  }

  /**
   * Displays the appropriate component control depending
   * on the type of question
   * @param  {Object} question
   * @return {JSX}
   */
  renderReleventResponseControl(question) {
    let component;

    switch (question.type) {
      case 'scale':
        component = (
          <Scale onSelect={response => this.props.onResponseGiven(question.id, response)} />
        );
        break;
      case 'multiple-choice':
        component = (
          <MultiChoiceOptions
            options={question.options}
            onSelect={response => this.props.onResponseGiven(question.id, response)}
          />
        );
        break;
      default:
        component = (
          <textarea
            className={'form-control'}
            rows={'3'}
            placeholder={'Say something'}
            onChange={e => this.props.onResponseGiven(question.id, e.target.value)}
          />
        );
    }

    return component;
  }

  /**
   * Renders wizard's nav buttons
   * @param  {Object} question
   * @return {JSX}
   */
  renderNavButtons(question) {
    const { currentStep } = this.state;
    const lastStep = this.props.questions.length - 1;

    return (
      <div className={'nav-buttons'}>
        {currentStep !== 0 && (
          <button
            className={'btn'}
            onClick={() => this.showStep(-1)}
          >
            {'Previous'}
          </button>
        )}
        {currentStep !== lastStep && (
          <button
            className={classnames('btn btn-primary btn-primary--dark', {
              'ml-auto': this.isOnlyNextButtonShown(question.skippable),
            })}
            onClick={() => this.showStep(1)}
            disabled={this.shouldDisableButton(question)}
          >
            {'Next'}
          </button>
        )}
        {currentStep === lastStep && (
          <button
            className={'btn btn-primary btn-primary--dark'}
            onClick={this.props.onSubmitFeedback}
            disabled={this.shouldDisableButton(question)}
          >
            {'Submit'}
          </button>
        )}
      </div>
    );
  }

  renderMeter() {
    const value = this.state.currentStep + 1;
    const max = this.props.questions.length;

    return (
      <div>
        <Meter
          className={'mt-4'}
          value={value}
          max={max}
        />
        <p className={'sub-title mt-3 mb-2'}>
          {'Questions Completed'}
        </p>
        <p>{`${value} / ${max}`}</p>
      </div>
    );
  }

  render() {
    const { questions, member, onGoBack } = this.props;
    const { currentStep } = this.state;

    return (
      <div className={'feedback-wizard'}>
        <a
          className={'feedback-wizard__go-back'}
          onClick={onGoBack}
        >
          <div>
            <img src={backArrow} alt={'back'} />
          </div>
          <span className={'sub-title'}>
            {'Back'}
          </span>
        </a>

        {questions.map((question, index) => (
          <div
            key={question.id}
            className={classnames('feedback-wizard__step', {
              'feedback-wizard__step--current-step': currentStep === index,
            })}
          >
            <div className={'question-section'}>
              <div className={'question-section__left'}>
                <h2>{question.question}</h2>
                <p className={'sub-title'}>
                  {`Share your feedback for ${member.name}`}
                </p>
              </div>
              <div className={'question-section__right'}>
                <img src={member.image} alt={member.name} />
              </div>
            </div>

            <div className={'card p-3'}>
              {this.renderReleventResponseControl(question)}
              {this.renderNavButtons(question)}
              {this.renderMeter()}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

FeedBackWizard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    teamFeedback: PropTypes.array.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGoBack: PropTypes.func.isRequired,
  onResponseGiven: PropTypes.func.isRequired,
  onSubmitFeedback: PropTypes.func.isRequired,
};

export default FeedBackWizard;
