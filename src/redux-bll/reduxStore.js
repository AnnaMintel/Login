import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer } from './loginReducer';
import { authReducer } from './authReducer';


export let store = createStore(combineReducers({
  login: loginReducer,
  auth: authReducer
}), applyMiddleware(thunk))

