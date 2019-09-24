const Joi = require("@hapi/joi");

/** 
  * @desc Joi schema to validate incoming POST request (used in auth router).
*/
exports.localStrategySchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
