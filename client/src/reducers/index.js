import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";
import timerReducer from "./timerReducer";

export default combineReducers({
  appStateReducer,
  authReducer,
  questionReducer,
  timerReducer
});