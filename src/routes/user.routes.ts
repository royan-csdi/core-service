import CUser from "@/controllers/user.controller"
import { Router } from "express"

const router = Router()

router.get("/", CUser.list)
router.get("/:id", CUser.getUserById)
router.put("/:id/:role", CUser.changeRole)

export default router
