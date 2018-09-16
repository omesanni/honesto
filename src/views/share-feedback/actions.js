import { SET_QUESTIONS } from './constants';

/**
 * Set questions in redux store;
 * @param  {Array} questions
 * @return {Object}
 */
export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    data: { questions },
  };
}

