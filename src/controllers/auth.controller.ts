import SAuth from "@/services/auth.service"
import { CustomError, formatResponse } from "@/utils"
import { VLoginSchema } from "@/validators"
import { VRefreshTokenSchema, VRegisterSchema } from "@/validators/auth.validator"
import { Request, Response, NextFunction } from "express"

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VLoginSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.login(value)
    res.json(formatResponse("T", "Login Success", user))
  } catch (error) {
    next(error)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VRegisterSchema.validate(req.body)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.register(value)

    res.json(formatResponse(true, "success", user))
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VRefreshTokenSchema.validate(req.body)

    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await SAuth.refreshToken(value)
    res.json(formatResponse(true, "success", user))
  } catch (error) {
    next(error)
  }
}

const scheduler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isStart } = req.body
    if (isStart === undefined) {
      throw new CustomError(400, "not value isStart")
    }
    SAuth.scheduler(isStart)
    res.json(formatResponse(true, "success", {}))
  } catch (error) {
    next(error)
  }
}

const CAuth = {
  login,
  register,
  refreshToken,
  scheduler,
}

export default CAuth
