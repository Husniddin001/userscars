const Joi = require("joi");

const carCreateScheam = Joi.object({
  model: Joi.string().min(2).max(36).required(),
});

const createUserScheam = Joi.object({
  fullName: Joi.string().optional(),
  login: Joi.string().required(),
  password: Joi.string().min(3).max(36).required(),
});
module.exports = { carCreateScheam, createUserScheam };
