import { expectSaga } from 'redux-saga-test-plan';

import music, { getJane } from 'sagas/music';
import { ActionTypes } from 'constants/index';

jest.mock('modules/connect', () => ({
  request: () => ({ items: [] }),
}));

describe('music', () => {
  it('should have the expected watchers', done => {
    expectSaga(music)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      });
  });

  it('should have the getJane saga', () =>
    expectSaga(getJane, { payload: {  } })
      .put({
        type: ActionTypes.GET_JANE_SUCCESS,
        payload: {
            items: [] 
        },
      })
      .run());
});
