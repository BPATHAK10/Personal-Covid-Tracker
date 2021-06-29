import { combineReducers } from 'redux';

import authReducer from './user/authReducer';

const reducers = combineReducers({ authReducer });

export default reducers