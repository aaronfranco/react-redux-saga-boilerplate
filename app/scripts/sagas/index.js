import { all, fork } from 'redux-saga/effects';

import github from './github';
import user from './user';
import music from './music';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(github),
    fork(music),
    fork(user),
  ]);
}
