import { cn } from "@/lib/utils"
import { useMediaQuery } from "react-responsive"
import { HashLoader } from "react-spinners"
import type { LoaderHeightWidthRadiusProps } from "react-spinners/helpers/props"

export function Loader({
  className,
  ...props
}: LoaderHeightWidthRadiusProps & { className?: string }) {
  const md = useMediaQuery({ query: "(min-width: 768px)" })

  return (
    <div
      className={cn(
        "flex h-screen w-screen items-center justify-center bg-[#4a1325] text-white",
        className
      )}
    >
      <HashLoader size={md ? 100 : 50} color="currentColor" {...props} />
    </div>
  )
}

export default Loader
