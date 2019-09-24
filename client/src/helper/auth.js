/** 
  * @desc To generate header config object for authorisation request.
  * @param {function} getState - from Redux.
  * @return {object} Config object with header config.
*/
export const axiosHeader = (getState) => {
  const token = getState().authReducer.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
}