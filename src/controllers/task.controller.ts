import { STask } from "@/services"
import { formatResponse } from "@/utils"
import {
  VTaskCreateSchema,
  VTaskFindSchema,
  VTaskUpdateSchema,
  VGetTasksByProjectSchema,
  VGetTasksByAssigneeSchema,
} from "@/validators"
import { NextFunction, Request, Response } from "express"
const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskCreateSchema.validate(req.body)

    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.createTask(value)
    res.json(formatResponse(true, "success", task))
  } catch (error) {
    next(error)
  }
}
const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { error, value } = VTaskUpdateSchema.validate(req.body)

    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.updateTask(id, value)
    res.json(formatResponse(true, "success", task))
  } catch (error) {
    next(error)
  }
}

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const task = await STask.findById(value)
    res.json(formatResponse(true, "success", task))
  } catch (error) {
    next(error)
  }
}

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await STask.getAllTask()
    res.json(formatResponse(true, "success", tasks))
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VTaskFindSchema.validate(req.params)
    if (error) {
      throw new Error(error.message)
    }
    const tasks = await STask.deleteTask(value)
    res.json(formatResponse(true, "success", tasks))
  } catch (error) {
    next(error)
  }
}

const getTasksByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VGetTasksByProjectSchema.validate(req.params)
    if (error) {
      throw new Error(error.message)
    }
    const tasks = await STask.getTasksByProjectId(value)
    res.json(formatResponse(true, "success", tasks))
  } catch (error) {
    next(error)
  }
}

const getTaskByAssignee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VGetTasksByAssigneeSchema.validate(req.params)
    if (error) {
      throw new Error(error.message)
    }
    const tasks = await STask.getTasksByAssigneeId(value)
    res.json(formatResponse(true, "success", tasks))
  } catch (error) {
    next(error)
  }
}

const deleteTaskByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VGetTasksByProjectSchema.validate(req.params)
    if (error) {
      throw new Error(error.message)
    }
    const tasks = await STask.deleteTaskByProject(value)
    res.json(formatResponse(true, "success", tasks))
  } catch (error) {
    next(error)
  }
}

const CTask = {
  createTask,
  updateTask,
  getTask,
  getAllTasks,
  deleteTask,
  getTasksByProject,
  getTaskByAssignee,
  deleteTaskByProject,
}

export default CTask
