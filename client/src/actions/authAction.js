import axios from "axios";
import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  SIGNOUT_SUCCESS,
  CLEAR_QUESTIONS
} from "../store/types";
import { handleLoading, handleDialog, handleSnackbar } from "./appStateAction";
import { errorMsg } from "../helper/error";
import { axiosHeader } from "../helper/auth";

export const loadUser = () => (dispatch, getState) => {
  const token = getState().authReducer.token;
  if(!token) return dispatch({ type: AUTH_FAIL });

  dispatch(handleLoading(true));  
  axios.get("/api/auth", axiosHeader(getState))
    .then(function(res) {
      dispatch(handleLoading(false));      
      dispatch({ 
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(function(err) {
      dispatch(handleLoading(false));
      dispatch({ type: AUTH_FAIL })
    })
}

export const signinWithEmail = data => dispatch => {
  dispatch(handleLoading(true));
  axios({
    method: "post",
    url: "/api/auth/signin",
    data: {
      email: data.email,
      password: data.password
    }
  })
  .then(function(res) {
    dispatch(handleLoading(false));
    dispatch(handleDialog("signinDialogOpen", false));
    dispatch(handleSnackbar(true, "success", "Signed in to your account"));    
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token
      }
    })
  })
  .catch(function(err) {
    console.log(err.response);
    dispatch({ type: SIGNIN_FAIL })
    dispatch(handleLoading(false));  
    dispatch(handleSnackbar(true, "error", errorMsg(err.response)));    
  })
}
export const signupWithEmail = data => dispatch => {
  dispatch(handleLoading(true));
  
  const body = {
    username: data.username,
    email: data.email,
    password: data.password
  };
  axios({
    method: "post",
    url: "/api/auth/signup",
    data: body
  })
    .then(function(res) {
      dispatch(handleLoading(false));
      dispatch(handleDialog("signupDialogOpen", false));
      dispatch(handleSnackbar(true, "success", "Successfully created your accound"));
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          user: res.data.user,
          token: res.date.token
        }
      });

    })
    .catch(function(err) {
      if(err.response && err.response.data) {
        dispatch(handleSnackbar(true, "error", errorMsg(err.response)));
      }
      dispatch({ type: SIGNUP_FAIL })
      dispatch(handleLoading(false));
    });
}

export const signOut = () => dispatch => {
  dispatch(handleLoading(true));
  dispatch({ type: CLEAR_QUESTIONS })
  dispatch({ type: SIGNOUT_SUCCESS })
  dispatch(handleLoading(false));
}