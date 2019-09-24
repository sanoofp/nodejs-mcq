import { 
  HANDLE_DIALOG_STATE,
  LOADING,
  SNACKBAR_STATE
} from "../store/types";

/** 
  * @desc Handle the state of material-ui DIalog component.
  * @param {string} type - The type of Dialog needed to be opened (Signin / signup).
  * @param {boolean} open - The state of dialog.
*/
export const handleDialog = (type, open) => {
  return {
    type: HANDLE_DIALOG_STATE,
    payload: {
      type,
      open
    }
  }
}

/** 
  * @desc Handles the state of Snackbar component.
  * @param {boolean} open - The state of snackbar.
  * @param {string} type - The type of snackbar needed to be opened. (error, success)
  * @param {string} message - The message needed to be appeared in the snackbar.
*/
export const handleSnackbar = (open, type = "error", message = "") => {
  return {
    type: SNACKBAR_STATE,
    payload: {
      open,
      type,
      message
    }
  }
}

/** 
  * @desc Handles the loading component state of the entire app.
  * @param {boolean} state - The open state of loading component.
*/
export const handleLoading = state => {
  return {
    type: LOADING,
    payload: state
  }
}
