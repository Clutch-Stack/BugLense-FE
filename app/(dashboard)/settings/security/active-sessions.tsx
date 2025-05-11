"use client"

import { useState } from "react"
import { LogOut, Smartphone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

// Mock active sessions
const initialSessions = [
  {
    device: "MacBook Pro",
    location: "San Francisco, CA",
    browser: "Chrome 109",
    ip: "192.168.1.1",
    lastActive: "Just now",
    current: true
  },
  {
    device: "iPhone 14",
    location: "San Francisco, CA",
    browser: "Safari Mobile",
    ip: "192.168.1.2",
    lastActive: "3 hours ago",
    current: false
  },
  {
    device: "Windows PC",
    location: "New York, NY",
    browser: "Firefox 108",
    ip: "192.168.1.3",
    lastActive: "2 days ago",
    current: false
  }
]

export default function ActiveSessions() {
  const [sessions, setSessions] = useState(initialSessions)
  
  function handleRevokeSession(index: number) {
    // Filter out the revoked session
    setSessions(sessions.filter((_, i) => i !== index))
    
    toast({
      title: "Session revoked",
      description: `The session on ${sessions[index].device} has been terminated.`,
    })
  }
  
  function handleRevokeAllSessions() {
    // Keep only the current session
    setSessions(sessions.filter(session => session.current))
    
    toast({
      title: "All other sessions revoked",
      description: "You have been logged out from all other devices.",
    })
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogOut className="h-5 w-5" />
          Active Sessions
        </CardTitle>
        <CardDescription>
          Manage your active sessions and logged-in devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {sessions.map((session, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-start gap-3">
                {session.device.includes("iPhone") ? (
                  <Smartphone className="h-10 w-10 text-muted-foreground" />
                ) : (
                  <Clock className="h-10 w-10 text-muted-foreground" />
                )}
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{session.browser} • {session.location}</p>
                    <p>IP: {session.ip}</p>
                    <p>Last active: {session.lastActive}</p>
                  </div>
                </div>
              </div>
              <div>
                {!session.current && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRevokeSession(index)}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleRevokeAllSessions}
          disabled={sessions.length <= 1}
        >
          Logout from all other devices
        </Button>
      </CardFooter>
    </Card>
  )
} 