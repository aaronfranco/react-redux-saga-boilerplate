// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {string} query
 * @returns {Object}
 */
export function getJane(): Object {
  return {
    type: ActionTypes.GET_JANE_REQUEST,
    payload: {  },
  };
}
