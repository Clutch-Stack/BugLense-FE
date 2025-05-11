"use client"

import { useState } from "react"
import { Bell, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      bugActivity: true,
      teamUpdates: true,
      projectUpdates: true,
      securityAlerts: true,
      productUpdates: false,
    },
    push: {
      bugActivity: true,
      teamUpdates: false,
      projectUpdates: true,
      securityAlerts: true,
      productUpdates: false,
    },
    frequency: "immediately"
  })

  const handleEmailToggle = (key: keyof typeof notifications.email) => {
    setNotifications({
      ...notifications,
      email: {
        ...notifications.email,
        [key]: !notifications.email[key]
      }
    })
  }
  
  const handlePushToggle = (key: keyof typeof notifications.push) => {
    setNotifications({
      ...notifications,
      push: {
        ...notifications.push,
        [key]: !notifications.push[key]
      }
    })
  }

  const handleFrequencyChange = (value: string) => {
    setNotifications({
      ...notifications,
      frequency: value
    })
  }

  function onSubmit() {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose when and how you want to be notified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              Email Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-bugs">Bug activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a bug is assigned to you or has updates.
                  </p>
                </div>
                <Switch 
                  id="email-bugs" 
                  checked={notifications.email.bugActivity}
                  onCheckedChange={() => handleEmailToggle("bugActivity")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-team">Team updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about team members and announcements.
                  </p>
                </div>
                <Switch 
                  id="email-team" 
                  checked={notifications.email.teamUpdates}
                  onCheckedChange={() => handleEmailToggle("teamUpdates")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-projects">Project updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Changes to projects you&apos;re part of or watching.
                  </p>
                </div>
                <Switch 
                  id="email-projects" 
                  checked={notifications.email.projectUpdates}
                  onCheckedChange={() => handleEmailToggle("projectUpdates")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-security">Security alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important security notifications and account alerts.
                  </p>
                </div>
                <Switch 
                  id="email-security" 
                  checked={notifications.email.securityAlerts}
                  onCheckedChange={() => handleEmailToggle("securityAlerts")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-product">Product updates</Label>
                  <p className="text-sm text-muted-foreground">
                    New features, improvements and other product news.
                  </p>
                </div>
                <Switch 
                  id="email-product" 
                  checked={notifications.email.productUpdates}
                  onCheckedChange={() => handleEmailToggle("productUpdates")}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              Push Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-bugs">Bug activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a bug is assigned to you or has updates.
                  </p>
                </div>
                <Switch 
                  id="push-bugs" 
                  checked={notifications.push.bugActivity}
                  onCheckedChange={() => handlePushToggle("bugActivity")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-team">Team updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about team members and announcements.
                  </p>
                </div>
                <Switch 
                  id="push-team" 
                  checked={notifications.push.teamUpdates}
                  onCheckedChange={() => handlePushToggle("teamUpdates")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-projects">Project updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Changes to projects you&apos;re part of or watching.
                  </p>
                </div>
                <Switch 
                  id="push-projects" 
                  checked={notifications.push.projectUpdates}
                  onCheckedChange={() => handlePushToggle("projectUpdates")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-security">Security alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important security notifications and account alerts.
                  </p>
                </div>
                <Switch 
                  id="push-security" 
                  checked={notifications.push.securityAlerts}
                  onCheckedChange={() => handlePushToggle("securityAlerts")}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-product">Product updates</Label>
                  <p className="text-sm text-muted-foreground">
                    New features, improvements and other product news.
                  </p>
                </div>
                <Switch 
                  id="push-product" 
                  checked={notifications.push.productUpdates}
                  onCheckedChange={() => handlePushToggle("productUpdates")}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
            <RadioGroup 
              defaultValue={notifications.frequency} 
              onValueChange={handleFrequencyChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediately" id="immediately" />
                <Label htmlFor="immediately">Send notifications immediately</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly">Digest - once per hour</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Digest - once per day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Digest - once per week</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit} disabled={isLoading}>
            Save notification settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 