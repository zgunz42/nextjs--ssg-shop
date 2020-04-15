import middleware from 'modules/redux/middleware';
import rootReducer from 'modules/redux/reducer';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';


const composeEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const initialState = {
  user: {
    logged: false,
  },
  cart: {
    count: 0,
    entries: [],
  },
  snackbar: {},
};

export default function configureStore(preloadedState = initialState) {
  const store = createStore(rootReducer, preloadedState, composeEnhancers);
  const persistor = persistStore(store);
  return { store, persistor };
}
