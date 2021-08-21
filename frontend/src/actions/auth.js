import { AUTH, INVALID_AUTH } from '../redux/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    // console.log("sign in formData::", formData)
    const {data,status}  = await api.signIn(formData);

    // console.log("sign in response::",data)
    if(status===200){
      // console.log("valid dispatched")

      dispatch({ type: AUTH, data });
      router.push('/');
    }else {
      // console.log("invalid dispatched")
      dispatch({type: INVALID_AUTH, data})
    }

    // window.location.reload(true)
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};