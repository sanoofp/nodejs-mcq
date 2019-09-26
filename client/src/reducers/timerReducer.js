import { 
  START_TIMER,
  STOP_TIMER,
  TIMER_TICK,
  HANDLE_TIMER 
} from "../store/types";

const initialState = {
  timeLeft: 900,
  isRunning: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case HANDLE_TIMER: {
      return {
        ...state,
        timeLeft: action.payload
      }
    }
    case TIMER_TICK: {
      return {
        ...state,
        timeLeft: state.timeLeft - 1
      }
    }
    case START_TIMER: {
      return {
        ...state,
        isRunning: true
      }
    }
    case STOP_TIMER: {
      return {
        ...state,
        timeLeft: 900,
        isRunning: false
      }
    }
    default:
      return state;
  }
}
