import { ReactNode } from "react"

export default function DeveloperLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex-1">{children}</div>
  )
} 