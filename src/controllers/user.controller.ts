import { Request, Response, NextFunction } from "express"
import { formatResponse } from "@/utils"
import { VUserChangeRoleSchema, VUserFindSchema } from "@/validators"
import SUser from "@/services/user.service"

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await SUser.getAllUsers()
    res.json(formatResponse(true, "success", users))
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VUserFindSchema.validate(req.params)

    if (error) {
      throw new Error(error.message)
    }
    const user = await SUser.findById(value.id)
    res.json(formatResponse(true, "success", user))
  } catch (error) {
    next(error)
  }
}

const changeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VUserChangeRoleSchema.validate(req.params)
    if (error) {
      throw new Error(error.message)
    }
    const user = await SUser.changeRole(value.id, value.role as "ADMIN" | "USER")
    res.json(formatResponse(true, "success", user))
  } catch (error) {
    next(error)
  }
}

const CUser = {
  list,
  getUserById,
  changeRole,
}

export default CUser
