import { Router, type IRouter } from "express"
import {
  getAllInvitations,
  getInvitationByName,
} from "../controllers/invitation.controller.js"

const router: IRouter = Router()

router.get("/", getAllInvitations)
router.get("/:name", getInvitationByName)

export default router
