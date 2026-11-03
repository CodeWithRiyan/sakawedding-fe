import Redirect from "@/components/redirect"
import { lazy } from "react"
import type { RouteObject } from "react-router"

// Public
const MainLayout = lazy(() => import("@/components/layouts/public/main-layout"))

const SAKALOKA_URL = "https://www.sakaloka.id"

export const PublicRoute: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Redirect to={SAKALOKA_URL} /> },
      { path: "*", element: <Redirect to={SAKALOKA_URL} /> },
    ],
  },
]

export const NotFoundRoute: RouteObject = {
  path: "*",
  element: <Redirect to={SAKALOKA_URL} />,
}
