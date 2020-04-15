import actionTypes from 'modules/redux/actionTypes';

const mapping = {
  [actionTypes.CART_UPDATE]: (state, action) => ({ ...state, ...action.payload }),
};

export const initialState = {
  count: undefined,
  entries: undefined,
};

export default function cartReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}
