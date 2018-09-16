/**
 * @overview team members reducer.
 */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { TEAM_FEEDBACK } from './constants';
import chrisAvatar from '../../images/chris.svg';
import nicoAvatar from '../../images/nico.svg';
import nateAvatar from '../../images/nathaniel.svg';
import denisAvatar from '../../images/denis.svg';
import paulAvatar from '../../images/paul.svg';

const initialState = [
  {
    id: 1,
    name: 'Chris Johnson',
    image: chrisAvatar,
    teamFeedback: [],
  },
  {
    id: 2,
    name: 'Nico Perez',
    image: nicoAvatar,
    teamFeedback: TEAM_FEEDBACK,
  },
  {
    id: 3,
    name: 'Nathaniel Moon',
    image: nateAvatar,
    teamFeedback: [],
  },
  {
    id: 4,
    name: 'Denis Denison',
    image: denisAvatar,
    teamFeedback: [],
  },
  {
    id: 5,
    name: 'Paul Carter',
    image: paulAvatar,
    teamFeedback: [],
  },
];

export default handleActions({
  UPDATE_MEMBER_FEEDBACK: (state, action) => {
    const { memberId, authorId, feedback, period } = action.data;

    const newMembers = state.toJS().map((member) => {
      if (member.id === memberId) {
        member.teamFeedback.push({
          userId: authorId,
          feedback: [{ period, response: feedback }],
        });
      }

      return member;
    });

    return state.merge(newMembers);
  },
}, fromJS(initialState));
