import reducer from 'reducers/music';
import { ActionTypes } from 'constants/index';

describe('Music', () => {
  it('should return the initial state', () => {
    expect(reducer.music(undefined, {}))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GET_JANE_REQUEST}`, () => {
    expect(reducer.music(undefined, {
      type: ActionTypes.GET_JANE_REQUEST,
      payload: {  },
    }))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GET_JANE_SUCCESS}`, () => {
    expect(reducer.music(undefined, {
      type: ActionTypes.GET_JANE_SUCCESS,
      payload: {},
    }))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GET_JANE_FAILURE}`, () => {
    expect(reducer.music(undefined, {
      type: ActionTypes.GET_JANE_FAILURE,
      payload: {},
    }))
      .toMatchSnapshot();
  });
});
