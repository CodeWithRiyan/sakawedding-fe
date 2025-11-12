import Loader from "@/components/custom/loader"
import { Suspense } from "react"
import { Outlet } from "react-router"
// import Footer from "./footer"
export default function MainLayout() {
  return (
    <div className="h-screen w-full">
      <main className="flex min-h-screen w-full justify-center">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
