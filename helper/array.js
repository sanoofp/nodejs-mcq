module.exports = {
  /** 
    * @desc shuffle elemnts in an array.
    * @param {array} array - The array which needs to be shuffeled.
    * @return {array} The shuffeled array.
  */
  shuffle: function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
}