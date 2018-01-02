import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';
import { parseError } from 'modules/connect';

import { ActionTypes } from 'constants/index';

export const musicState = {
  username: "",
  name: "",
  music: [],
  state: "idle",
  message: ''
};

export default {
  music: createReducer(musicState, {
    [ActionTypes.GET_JANE_REQUEST](state, { payload }) {

      return immutable(state, {
           username: { $set: payload.username },
           name: { $set: payload.name },
           music: { $set: payload.music },
           message: { $set: ''},
           state: { $set: 'running' },
      });
    },
    [ActionTypes.GET_JANE_SUCCESS](state, { payload }) {
         console.log(payload)
      return immutable(state, {
           username: { $set: payload.username },
           name: { $set: payload.name },
           music: { $set: payload.music },
           message: { $set: "" },
           state: { $set: 'loaded' },
      });
    },
    [ActionTypes.GET_JANE_FAILURE](state, { payload }) {
      return immutable(state, {
        state: { $set: 'error' },
        message: { $set: parseError(payload.message) },
      });
    },
  }),
};
