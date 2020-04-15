import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'


import cartReducer from "modules/redux/reducer/cartReducer";
import snackbarReducer from "modules/redux/reducer/snackbarReducer";
import userReducer from "modules/redux/reducer/userReducer";

const rootReducer = combineReducers({
    cart: typeof window === 'undefined' ? cartReducer : persistReducer({
        key: 'cart',
        storage: new CookieStorage(Cookies)
    }, cartReducer),
    user: typeof window === 'undefined' ? userReducer : persistReducer({
        key: 's',
        storage: new CookieStorage(Cookies)
    }, userReducer),
    snackbar: snackbarReducer
});

export default rootReducer;
