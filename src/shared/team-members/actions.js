import { UPDATE_MEMBER_FEEDBACK } from './constants';

/**
 * Update feedback given to a particular team member
 * @param  {Number} memberId Team member that is receiving feedback
 * @param  {Number} authorId The author of the feedback
 * @param  {Object} feedback Feedback response object
 * @param  {Object} period   Period of feedback
 * @return {Object}
 */
export function updateTeamMemberFeedback(memberId, authorId, feedback, period) {
  return {
    type: UPDATE_MEMBER_FEEDBACK,
    data: {
      memberId,
      authorId,
      feedback,
      period,
    },
  };
}
