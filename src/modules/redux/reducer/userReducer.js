import actionTypes from 'modules/redux/actionTypes';

const mapping = {
  [actionTypes.USER_UPDATE]: (state, action) => ({ ...state, ...action.payload }),
};

const initialState = {
  logged: undefined,
  username: undefined,
  logout: undefined,
};

export default function userReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}
