import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
  appStateReducer,
  authReducer,
  questionReducer
});