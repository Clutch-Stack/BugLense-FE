import { ReactNode } from "react"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex-1">{children}</div>
  )
} 