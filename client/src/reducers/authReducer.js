import { 
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  GOOGLE_AUTH_FAIL,
  GOOGLE_AUTH_SUCCESS,
  SIGNOUT_SUCCESS
 } from "../store/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: localStorage.getItem("jwt-token")
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SIGNIN_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
    case SIGNUP_SUCCESS: {
      localStorage.setItem("jwt-token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    }

    case SIGNIN_FAIL:
    case AUTH_FAIL:
    case GOOGLE_AUTH_FAIL:
    case SIGNOUT_SUCCESS:
    case SIGNUP_FAIL: {
      localStorage.removeItem("jwt-token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null
      }
    }

    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    }

    default:
      return state;
  }
}