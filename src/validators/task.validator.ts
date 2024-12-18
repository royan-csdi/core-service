import Joi from "joi"

export const VTaskFindSchema = Joi.object({
  id: Joi.string().required(),
})

export const VTaskCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid("PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED")
    .default("PLANNING")
    .required(),
  dueDate: Joi.date().greater("now").required(),
  projectId: Joi.string().required(),
  assigneeId: Joi.string().required(),
})

export const VTaskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"),
  dueDate: Joi.date().greater("now"),
})

export const VAddUserToTaskSchema = Joi.object({
  taskId: Joi.string().required(),
  userId: Joi.string().required(),
})

export const VGetTasksByProjectSchema = Joi.object({
  projectId: Joi.string().required(),
})
export const VGetTasksByAssigneeSchema = Joi.object({
  assigneeId: Joi.string().required(),
})

export const VRemoveUserFromTaskSchema = Joi.object({
  taskId: Joi.string().required(),
  userId: Joi.string().required(),
})
