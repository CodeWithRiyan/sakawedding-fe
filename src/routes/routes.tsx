import Redirect from "@/components/redirect"
import { lazy } from "react"
import type { RouteObject } from "react-router"

// Public
const MainLayout = lazy(() => import("@/components/layouts/public/main-layout"))
const InvitationPage = lazy(() => import("@/pages/invitation"))
const ShareLinkPage = lazy(() => import("@/pages/share-link"))
const MessageGeneratorPage = lazy(() => import("@/pages/message-generator"))

const SAKALOKA_URL = "https://www.sakaloka.id"

export const PublicRoute: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Redirect to={SAKALOKA_URL} /> },
      { path: "/invitation/:name", element: <InvitationPage /> },
      { path: "/share-link", element: <ShareLinkPage /> },
      { path: "/message/:name", element: <MessageGeneratorPage /> },
      { path: "*", element: <Redirect to={SAKALOKA_URL} /> },
    ],
  },
]

export const NotFoundRoute: RouteObject = {
  path: "*",
  element: <Redirect to={SAKALOKA_URL} />,
}
