import { Router } from "express"
import authRouter from "@/routes/auth.routes"
import userRouter from "@/routes/user.routes"

const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)

export default router
