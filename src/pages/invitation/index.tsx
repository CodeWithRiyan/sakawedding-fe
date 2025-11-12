import reactLogo from "@/assets/react.svg"
import { Button } from "@/components/ui/button"
import queryString from "query-string"
import { useState } from "react"
import { useLocation, useParams } from "react-router"
import viteLogo from "/vite.svg"

function InvitationPage() {
  const [count, setCount] = useState(0)
  const params = useParams()
  const location = useLocation()
  const searchParams = queryString.parse(location.search) as {
    [key: string]: string
  }
  const name = params.name
  console.log("name", name)

  console.log("searchParams", searchParams)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <div className="mb-5 flex items-center gap-20">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="size-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="size-20" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-semibold">Vite + React</h1>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <p>
        Edit <code>src/pages/invitation/index.tsx</code> and save to test HMR
      </p>
      <p className="">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default InvitationPage
