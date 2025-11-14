import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import invitationRoutes from "./routes/invitation.routes.js"
import commentRoutes from "./routes/comment.routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use("/api/invitations", invitationRoutes)
app.use("/api/comments", commentRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

// Serve static files from the frontend build (in production)
const distPath = path.join(__dirname, "../../dist")
app.use(express.static(distPath))

// Handle client-side routing - serve index.html for all non-API routes
// Use a regex pattern instead of * for Express 5 compatibility
app.get(/^(?!\/api|\/health).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
