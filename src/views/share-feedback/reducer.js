/**
 * @overview Share Feedback reducer.
 */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initialState = {
  questions: [],
};

export default handleActions({
  SET_QUESTIONS: (state, action) => state.set('questions', action.data.questions),
}, fromJS(initialState));
