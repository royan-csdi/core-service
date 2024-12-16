import SAuth from "@/services/auth.service"
import { CustomError, formatResponse } from "@/utils"
import { VLoginSchema } from "@/validators"
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

const CAuth = {
  login,
}

export default CAuth
