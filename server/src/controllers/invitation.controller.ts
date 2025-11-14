import { Request, Response } from "express"
import invitationsData from "../data/invitations.json"

export const getInvitationByName = (req: Request, res: Response) => {
  const { name } = req.params

  const invitation =
    invitationsData[name as keyof typeof invitationsData]

  if (!invitation) {
    return res.status(404).json({
      success: false,
      message: "Invitation not found",
    })
  }

  return res.json({
    success: true,
    data: invitation,
  })
}

export const getAllInvitations = (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: invitationsData,
  })
}
