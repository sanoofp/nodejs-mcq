import axios from "axios";
import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  SIGNOUT_SUCCESS,
  CLEAR_QUESTIONS,
  GOOGLE_AUTH_FAIL,
  GOOGLE_AUTH_SUCCESS
} from "../store/types";
import { handleLoading, handleDialog, handleSnackbar } from "./appStateAction";
import { errorMsg } from "../helper/error";
import { axiosHeader } from "../helper/auth";

/** 
  * @desc Authorise the user, if the jwt token is found 
  * in the localStorage, else hit's the back end api and get the user. 
*/
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

/** 
  * @desc Sign in a user using the email and pasword provided. 
  * If the response i OK, the loading, snackbar and dialog state are updated. 
*/
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
    dispatch({ type: SIGNIN_FAIL })
    dispatch(handleLoading(false));  
    dispatch(handleSnackbar(true, "error", errorMsg(err.response)));    
  })
}

/** 
  * @desc Create an account for the user using the email, username and pasword provided.
  * If the response is OK, the loading, snackbar and dialog state are updated 
*/
export const signupWithEmail = data => (dispatch, getState) => {
  dispatch(handleLoading(true));
  
  const body = {
    username: data.username,
    email: data.email,
    password: data.password
  };
  axios.post("/api/auth/signup", body)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          user: res.data.user,
          token: res.data.token
        }
      });
      dispatch(handleLoading(false));
      dispatch(handleDialog("signupDialogOpen", false));
      dispatch(handleSnackbar(true, "success", "Successfully created your account"));
    })
    .catch(err => {
      dispatch(handleLoading(false));
      if(err.response && err.response.data) {
        dispatch(handleSnackbar(true, "error", errorMsg(err.response)));
        dispatch({ type: SIGNUP_FAIL })
      }
    });
}

/** 
  * @desc Signin or signup user with the google account.
*/
export const googleAuth = googleResponseObj => (dispatch, getState) => {
  dispatch(handleLoading(true));
  const body = { googleResponseObj }

  axios({
    method: "post",
    url: "/api/auth/google",
    data: body,
  })
    .then(function(res) {
      dispatch(handleLoading(false));
      dispatch(handleDialog("signinDialogOpen", false));
      dispatch(handleDialog("signupDialogOpen", false));
      dispatch(handleSnackbar(true, "success", "Successfully logged in with Google"));
      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: {
          user: res.data.user,
          token: res.data.token
        }
      })
    })
    .catch(function(err) {
      dispatch({ type: GOOGLE_AUTH_FAIL })      
      dispatch(handleLoading(false));
    });
}

/** 
  * @desc Sign out the user.
  * Since, jwt is used for authetication and authorisation,
  * there is no need to hit the backend API.
  * Just clear the localStorage and required state of the app. 
*/
export const signOut = () => dispatch => {
  dispatch(handleLoading(true));
  dispatch({ type: CLEAR_QUESTIONS })
  dispatch({ type: SIGNOUT_SUCCESS })
  dispatch(handleSnackbar(true, "success", "Signed out of your account"));
  dispatch(handleLoading(false));
}