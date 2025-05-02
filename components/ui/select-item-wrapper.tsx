"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// This is a wrapper component to fix compatibility issues with Turbopack and React 19
export function SelectItemWrapper({
  className,
  children,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) {
  // Ensure the value prop is not an empty string
  const safeValue = value || "default-value"
  
  try {
    return (
      <SelectPrimitive.Item
        data-slot="select-item"
        className={cn(
          "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
          className
        )}
        value={safeValue}
        {...props}
      >
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <CheckIcon className="size-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  } catch (error) {
    console.error("Error rendering SelectItem:", error)
    // Fallback rendering in case of issues
    return (
      <div 
        className={cn(
          "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none",
          className
        )}
      >
        {children}
      </div>
    )
  }
} 