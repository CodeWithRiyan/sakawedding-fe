import { Router, type IRouter } from "express"
import { getComments, createComment } from "../controllers/comment.controller.js"

const router: IRouter = Router()

router.get("/:invitationId", getComments)
router.post("/:invitationId", createComment)

export default router
