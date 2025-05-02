import { ReactNode } from "react"

export default function TeamLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {children}
    </div>
  )
} 