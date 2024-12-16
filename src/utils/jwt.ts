import { env } from "@/configs"
import jwt from "jsonwebtoken"

export const generateToken = (type: string, userId: string) => {
  return jwt.sign({ userId }, env.APP.JWT_SECRET, {
    expiresIn: env.APP.JWT_EXPIRES_IN,
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.APP.JWT_SECRET)
}
