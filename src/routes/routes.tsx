import { lazy } from "react"
import type { RouteObject } from "react-router"

// Public
const MainLayout = lazy(() => import("@/components/layouts/public/main-layout"))
const LandingPage = lazy(() => import("@/pages/landing"))
const InvitationPage = lazy(() => import("@/pages/invitation"))
const ShareLinkPage = lazy(() => import("@/pages/share-link"))

// Not Found
const NotFound = lazy(() => import("@/pages/not-found"))

export const PublicRoute: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/invitation/:name", element: <InvitationPage /> },
      { path: "/share-link", element: <ShareLinkPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]

export const NotFoundRoute: RouteObject = {
  path: "*",
  element: <NotFound />,
}
