import { combineReducers } from 'redux';

import authReducer from './authReducer';
import contactReducer from './contactReducer';

const reducers = combineReducers({ authReducer,contactReducer });

export default reducers