//VALIDATION
const Joi = require('@hapi/joi');

// Register Validations
const postValidations = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().min(6)
  })

  return schema.validate(data);
};

module.exports = postValidations;
