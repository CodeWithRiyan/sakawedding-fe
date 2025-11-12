import Loader from "@/components/custom/loader"
import { Suspense } from "react"
import { Route, Routes } from "react-router"
import { NotFoundRoute, PublicRoute } from "./routes"

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {PublicRoute.map(({ path, element, children }, i) => (
          <Route key={i} path={path} element={element}>
            {children?.map(
              ({ path: childPath, element: childElement, children }, j) => (
                <Route key={j} path={childPath} element={childElement}>
                  {children?.map(
                    (
                      { path: grandChildPath, element: grandChildElement },
                      k
                    ) => (
                      <Route
                        key={k}
                        path={grandChildPath}
                        element={grandChildElement}
                      />
                    )
                  )}
                </Route>
              )
            )}
          </Route>
        ))}

        {/* Not Found */}
        <Route path={NotFoundRoute.path} element={NotFoundRoute.element} />
      </Routes>
    </Suspense>
  )
}
