import Joi from "joi"

export const VLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const VRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
})

export const VRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
})
