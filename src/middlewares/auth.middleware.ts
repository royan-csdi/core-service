import { env } from "@/configs"
import redisClient from "@/configs/redis.config"
import { CustomError, verifyToken } from "@/utils"
import { Request, Response, NextFunction } from "express"
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers?.authorization
  const missingAuthError = new CustomError(401, "Missing Auth Token")

  if (typeof bearerHeader === "undefined") {
    next(missingAuthError)
  }

  const token = bearerHeader?.split("Bearer ")?.[1] ?? ""

  if (!token || token === "") {
    next(missingAuthError)
  }

  try {
    const isTokenValid = verifyToken(token, env.APP.JWT_SECRET) as JwtPayload
    const isTokenExist = await redisClient.get(`auth:${isTokenValid?.userId}:accessToken`)

    if (!isTokenExist) {
      throw new CustomError(403, "Invalid Token")
    }
    next()
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return next(new CustomError(401, "Token has expired"))
    } else if (err instanceof JsonWebTokenError) {
      return next(new CustomError(401, "Invalid token"))
    }
    next(err)
  }
}

export default authMiddleware
