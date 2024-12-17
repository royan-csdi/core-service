import Joi from "joi"

export const VUserFindSchema = Joi.object({
  id: Joi.string().required(),
})

export const VUserChangeRoleSchema = Joi.object({
  id: Joi.string().required(),
  role: Joi.string().valid("ADMIN", "USER").required(),
})
