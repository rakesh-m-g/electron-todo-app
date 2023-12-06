const Joi = require('joi');

const todoValidationSchema = Joi.object({
  name: Joi.string().required(),
});

const validateTodo = (data) => {
  return todoValidationSchema.validate(data);
};

module.exports = {
  validateTodo,
};
