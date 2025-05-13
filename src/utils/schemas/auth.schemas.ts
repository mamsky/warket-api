import Joi from 'joi';

export const RegisterSchemas = Joi.object({
  name: Joi.string().max(20),
  username: Joi.string().max(15),
  email: Joi.string().email().max(50),
  password: Joi.string().min(6),
});
