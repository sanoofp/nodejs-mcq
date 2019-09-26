import { 
  SET_QUESTIONS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_INDEX,
  CLEAR_QUESTIONS,
  SET_RESULTS,
  SET_CURRENT_CHOICE,
} from "../store/types";
import axios from "axios";
import { handleLoading, handleDialog } from "./appStateAction";
import { stopTimer } from "./timerAction";
import { axiosHeader } from "../helper/auth";

/** 
  * @desc Get all questions from database.
*/
export const loadQuestions = () => (dispatch, getState) => {
  dispatch(handleLoading(true))
  axios.get("/api/question", axiosHeader(getState))
    .then(res => {
      dispatch(handleLoading(false));
      dispatch({ type: SET_QUESTIONS, payload: res.data })
    })
    .catch(err => dispatch({ type: CLEAR_QUESTIONS }))
};

/** 
  * @desc Set the current question.
  * @param {number} index - The index of current active question.
  * @param {object} question - The current active question.
*/
export const setCurrentQuestion = (index, question) => {
  return {
    type: SET_CURRENT_QUESTION,
    payload: {
      index,
      question,
    }
  }
}

/** 
  * @desc Set the current selected option.
  * @param {string} choice - The selected option of current question.
*/
export const setCurrentChoice = choice => {
  return {
    type: SET_CURRENT_CHOICE,
    payload: choice
  }
}

/** 
  * @desc Set the index of question needed to be viewed in dashboard.
  * @param {number} index - The index question to be shown on dashboard.
*/
export const setCurrentIndex = index => {
  return {
    type: SET_CURRENT_INDEX,
    payload: index
  }
}

/** 
  * @desc Submit the answers for report generation. 
  * The question from the state is filtered out to only return the questions which 
  * are attedned by the user and sends to the backend API.
  * 
*/
export const submitAnswers = () => (dispatch, getState) => {
  let { questions } = getState().questionReducer;
  questions = questions.filter(question => question["answer"]);
  const body = JSON.stringify({ questions })

  dispatch(handleLoading(true))
  axios.post("/api/question/evaluate", body, axiosHeader(getState))
  .then((res) => {
    dispatch(handleLoading(false))
    dispatch(stopTimer());
    dispatch({
      type: SET_RESULTS,
      payload: res.data
    });
  })
  .catch((err) => {
    dispatch(handleLoading(false))
    console.log(err);
  });
}


/** 
  * @desc Clear current questions for next round of test.
*/
export const rerunTest = () => dispatch => {
  dispatch({ type: CLEAR_QUESTIONS });
  dispatch(handleDialog("instructionsDialogOpen", true))
}