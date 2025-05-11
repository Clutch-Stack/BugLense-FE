"use client"

import dynamic from 'next/dynamic'
import { Loader2 } from "lucide-react"

// Dynamic import the client-side components with no SSR
const SecurityForms = dynamic(() => import('./security-forms'), { 
  ssr: false,
  loading: () => <div className="py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
})

// Dynamic import for Sessions component
const ActiveSessions = dynamic(() => import('./active-sessions'), {
  ssr: false,
  loading: () => <div className="py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
})

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <SecurityForms />
      <ActiveSessions />
    </div>
  )
} 