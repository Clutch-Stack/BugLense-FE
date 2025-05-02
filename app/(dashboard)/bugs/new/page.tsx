"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewBugPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the new report page
    router.push("/bugs/report")
  }, [router])
  
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <p className="text-muted-foreground">Redirecting to new bug report page...</p>
    </div>
  )
} 