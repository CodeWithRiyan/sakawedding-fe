import dayjs from "dayjs"
import id from "dayjs/locale/id"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import "./index.css"
import AppRoutes from "./routes/app-routes.tsx"

dayjs.locale(id)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)
