import actionTypes from 'modules/redux/actionTypes';

const initalState = {
  open: false,
  variant: 'success',
  message: '',
};

const mapping = {
  [actionTypes.SNACKBAR_OPEN]: (state, action) => ({
    open: true,
    ...action.payload,
  }),
  [actionTypes.SNACKBAR_CLOSE]: (state) => ({
    ...state,
    open: false,
  }),
};

export default function snackbarReducer(state = initalState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}
