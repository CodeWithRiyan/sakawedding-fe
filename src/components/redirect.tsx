import { useEffect } from "react"

interface RedirectProps {
  to: string
}

export default function Redirect({ to }: RedirectProps) {
  useEffect(() => {
    window.location.href = to
  }, [to])

  return null
}
