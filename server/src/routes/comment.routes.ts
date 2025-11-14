import { Router, type IRouter } from "express"
import { getComments, createComment } from "../controllers/comment.controller"

const router: IRouter = Router()

router.get("/:invitationId", getComments)
router.post("/:invitationId", createComment)

export default router
