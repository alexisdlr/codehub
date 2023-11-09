import { cn } from "@/lib/utils"
import { MouseEventHandler } from "react"

interface IconButton {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
  className?: string
}
const IconButton = ({className, onClick, icon}: IconButton) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
      "rounded-full bg-white flex items-center justify-center border shadow-md p-2 hover:scale-110 transition"
      ,className
    )}>
      {icon}
    </button>
  )
}

export default IconButton