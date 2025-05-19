import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loading spinner
   */
  size?: "sm" | "md" | "lg"
  
  /**
   * Optional text to display below the spinner
   */
  text?: string
  
  /**
   * Whether to show the loading spinner with a skeleton loading effect
   */
  skeleton?: boolean
}

export function Loading({
  size = "md",
  text,
  skeleton = false,
  className,
  ...props
}: LoadingProps) {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }
  
  if (skeleton) {
    return (
      <div 
        className={cn(
          "flex justify-center items-center py-8",
          className
        )}
        {...props}
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-32 bg-muted rounded mb-2"></div>
          <div className="h-4 w-48 bg-muted rounded"></div>
          {text && (
            <div className="mt-4 h-4 w-24 bg-muted rounded"></div>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClass[size])} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
} 