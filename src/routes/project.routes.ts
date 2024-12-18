import { CProject } from "@/controllers"
import { Router } from "express"

const router = Router()

router.route("/").get(CProject.getAllProjects).post(CProject.createProject)

router.route("/:id").get(CProject.getProjectById).patch(CProject.updateProject).delete(CProject.deleteProject)

router.route("/add-user").post(CProject.addUserToProject)
router.route("/remove-user").delete(CProject.removeUserFromProject)
router.route("/user/:id").get(CProject.getProjectsByUserId)
router.route("/all-projects/:id").get(CProject.getAllProjectsByUserId)

export default router
