import { Router } from "express"
import authRouter from "@/routes/auth.routes"
import userRouter from "@/routes/user.routes"
import { authMiddleware } from "@/middlewares"
import projectRouter from "@/routes/project.routes"
import taskRouter from "@/routes/task.routes"
// import notificationRouter from "@/routes/notification.routes"

const router = Router()

router.use("/auth", authRouter)
router.use("/user", authMiddleware, userRouter)
router.use("/projects", authMiddleware, projectRouter)
router.use("/tasks", authMiddleware, taskRouter)
// router.use("/notifications", authMiddleware, notificationRouter)

export default router
