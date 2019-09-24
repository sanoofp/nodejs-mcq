/** 
  * @desc To decode the Error response from the backend.
  * @param {object} res - Respone object.
  * @return {array} Array with all the error formatted.
*/
export const errorMsg = (res) => {
  if(!res.data.details) return `${res.data.message}`;

  const errorArr = []
  res.data.details.map(detail => errorArr.push(detail.message));
  return errorArr.join(",");
}