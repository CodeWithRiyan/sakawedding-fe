/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const commentsFilePath = path.join(__dirname, "../data/comments.json")

// Ensure data directory and file exist
const ensureDataFile = () => {
  const dataDir = path.dirname(commentsFilePath)

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
    console.log("✓ Created data directory:", dataDir)
  }

  if (!fs.existsSync(commentsFilePath)) {
    fs.writeFileSync(commentsFilePath, JSON.stringify({}))
    console.log("✓ Created comments.json file")
  }
}

const readComments = () => {
  ensureDataFile()
  const data = fs.readFileSync(commentsFilePath, "utf-8")
  return JSON.parse(data)
}

const writeComments = (data: any) => {
  ensureDataFile()
  fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2))
}

export const getComments = (req: Request, res: Response) => {
  const { invitationId } = req.params
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10

  const allComments = readComments()
  const invitationComments = allComments[invitationId] || []

  const sortedComments = invitationComments.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedComments = sortedComments.slice(startIndex, endIndex)

  const totalComments = sortedComments.length
  const totalPages = Math.ceil(totalComments / limit)

  return res.json({
    success: true,
    data: paginatedComments,
    pagination: {
      currentPage: page,
      totalPages,
      totalComments,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  })
}

export const createComment = (req: Request, res: Response) => {
  const { invitationId } = req.params
  const { author, message } = req.body

  if (!author || !message) {
    return res.status(400).json({
      success: false,
      message: "Author and message are required",
    })
  }

  if (message.length > 500) {
    return res.status(400).json({
      success: false,
      message: "Message cannot exceed 500 characters",
    })
  }

  const allComments = readComments()

  if (!allComments[invitationId]) {
    allComments[invitationId] = []
  }

  const newComment = {
    id: Date.now().toString(),
    invitationId,
    author,
    message,
    createdAt: new Date().toISOString(),
  }

  allComments[invitationId].push(newComment)
  writeComments(allComments)

  return res.status(201).json({
    success: true,
    data: newComment,
    message: "Comment created successfully",
  })
}
