import { SProject } from "@/services"
import { formatResponse } from "@/utils"
import { VAddUserToProjectSchema, VProjectCreateSchema, VProjectFindSchema, VProjectUpdateSchema } from "@/validators"
import { NextFunction, Request, Response } from "express"

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ownerId } = req.query
    let projects

    if (ownerId) {
      projects = await SProject.getAllProjectsByUserId(ownerId as string)
    } else {
      projects = await SProject.getAllProjects()
    }
    res.json(formatResponse("T", "success", projects))
  } catch (error) {
    next(error)
  }
}

const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.findById(value)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectCreateSchema.validate(req.body)
    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.createProject(value)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { error, value } = VProjectUpdateSchema.validate({ ...req.body, id })
    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.updateProject(id, value)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.params)
    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.deleteProject(value)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const addUserToProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VAddUserToProjectSchema.validate(req.body)
    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.addUserToProject(value.projectId, value.userId)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const removeUserFromProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VAddUserToProjectSchema.validate(req.body)
    if (error) {
      throw new Error(error.message)
    }

    const project = await SProject.removeUserFromProject(value.projectId, value.userId)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const getProjectsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.getProjectsByMemberId(value.id)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const getAllProjectsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VProjectFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const project = await SProject.getAllProjectsByUserId(value.id)
    res.json(formatResponse(true, "success", project))
  } catch (error) {
    next(error)
  }
}

const CProject = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addUserToProject,
  removeUserFromProject,
  getProjectsByUserId,
  getAllProjectsByUserId,
}

export default CProject
