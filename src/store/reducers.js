/**
 * @overview Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';
import modalsReducer from '../shared/modals/reducer';
import teamMembersReducer from '../shared/team-members/reducer';
import sharedFeedbackReducer from '../views/share-feedback/reducer';

const rootReducer = combineReducers({
  teamMembers: teamMembersReducer,
  modals: modalsReducer,
  feedback: sharedFeedbackReducer,
});

export default rootReducer;
