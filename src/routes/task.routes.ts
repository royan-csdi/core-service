import { CTask } from "@/controllers"
import { Router } from "express"

const router = Router()

router.route("/").get(CTask.getAllTasks).post(CTask.createTask)
router.route("/:id").get(CTask.getTask).patch(CTask.updateTask).delete(CTask.deleteTask)
router.route("/project/:projectId").get(CTask.getTasksByProject).delete(CTask.deleteTaskByProject)
router.get("/assignee/:assigneeId", CTask.getTaskByAssignee)

export default router
