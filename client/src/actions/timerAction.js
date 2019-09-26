import { 
  TIMER_TICK,
  START_TIMER,
  STOP_TIMER
} from "../store/types";
import { handleDialog } from "./appStateAction";

let timer = null;

const tick = () => ({ type: TIMER_TICK });

export const startTimer = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: START_TIMER });
  dispatch(tick());
}

export const stopTimer = () => dispatch => {
  clearInterval(timer);
  dispatch({
    type: STOP_TIMER
  });
}

export const checkTimer = () => dispatch => {
  if(timer === null) {
    dispatch(handleDialog("instructionsDialogOpen", true));
  }
}