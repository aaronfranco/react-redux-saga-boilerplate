/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/connect';

import { ActionTypes } from 'constants/index';

/**
 * getJane
 *
 * @param {Object} action
 *
 */
export function* getJane({ payload }) {
  try {
    const response = yield call(request, 'http://localhost:8001/jane');
    yield put({
      type: ActionTypes.GET_JANE_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_JANE_FAILURE,
      payload: err,
    });
  }
}

/**
 * Music Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_JANE_REQUEST, getJane),
  ]);
}
