import { 
  SET_QUESTIONS,
  CLEAR_QUESTIONS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_CHOICE,
  SET_CURRENT_INDEX,
  SET_RESULTS
 } from "../store/types";

const initialState = {
  questions: [],
  currentIndex: 0,
  currentChoice: "",
  results: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_QUESTIONS: {
      return {
        ...state,
        questions: action.payload
      }
    }

    case CLEAR_QUESTIONS: {
      return {
        ...state,
        questions: [],
        currentIndex: 0,
        currentChoice: "",
        results: {},
      }
    }

    case SET_CURRENT_CHOICE: {
      return {
        ...state,
        currentChoice: action.payload
      }
    }

    case SET_CURRENT_INDEX: {
      return {
        ...state,
        currentIndex: action.payload
      }
    }

    case SET_RESULTS: {
      return {
        ...state,
        results: action.payload
      }
    }

    case SET_CURRENT_QUESTION: {
      return {
        ...state,
        currentIndex: action.payload.index,
        questions: [
          ...state.questions.slice(0, action.payload.index - 1),
          action.payload.question,
          ...state.questions.slice(action.payload.index)
        ]
      }
    }

    default:
      return state;
  }
}