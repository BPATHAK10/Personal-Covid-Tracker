import * as actionType from './actionTypes';

const authReducer = (state = { authData: null, authError: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('userInfo', JSON.stringify({ ...action?.data }));
      
      return { ...state, authData: action.data };
    
    case actionType.INVALID_AUTH:
      return {...state, authError: action.data}

    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, authError: null };
    default:
      return state;
  }
};

export default authReducer;