const Joi = require("joi");

const userCreateSchema = Joi.object({
  login: Joi.string().min(3).max(36).required(),
  password: Joi.string().min(3).max(36).required(),
  fullName: Joi.string().optional(),
});

module.exports = { userCreateSchema };
