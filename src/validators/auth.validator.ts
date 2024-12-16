import Joi from "joi"

export const VLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})
