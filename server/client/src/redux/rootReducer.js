import { combineReducers } from 'redux';

import authReducer from './authReducer';
import contactReducer from './contactReducer';
import relationReducer from './relationReducer';

const reducers = combineReducers({ authReducer,contactReducer,relationReducer });

export default reducers