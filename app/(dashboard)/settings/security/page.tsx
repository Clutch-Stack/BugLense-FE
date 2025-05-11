"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, ShieldAlert, KeyRound, LogOut, Smartphone, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

// Mock active sessions
const sessions = [
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

export default function SecurityPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [isShowingSetup2FA, setIsShowingSetup2FA] = useState(false)
  
  const defaultValues: Partial<PasswordFormValues> = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues,
  })

  function onPasswordSubmit() {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
      form.reset(defaultValues)
    }, 1000)
  }

  function handleToggle2FA(checked: boolean) {
    setIs2FAEnabled(checked)
    if (checked) {
      setIsShowingSetup2FA(true)
    } else {
      toast({
        title: "Two-factor authentication disabled",
        description: "Your account is now less secure.",
        variant: "destructive"
      })
    }
  }

  function handle2FASetupComplete() {
    setIsShowingSetup2FA(false)
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure.",
    })
  }
  
  function handleRevokeSession(index: number) {
    toast({
      title: "Session revoked",
      description: `The session on ${sessions[index].device} has been terminated.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Password
          </CardTitle>
          <CardDescription>
            Change your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel htmlFor="2fa">Two-factor authentication</FormLabel>
              <p className="text-sm text-muted-foreground">
                Require an authentication code in addition to your password.
              </p>
            </div>
            <Switch 
              id="2fa" 
              checked={is2FAEnabled}
              onCheckedChange={handleToggle2FA}
            />
          </div>
          
          {isShowingSetup2FA && (
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="text-base font-medium mb-2">Set up two-factor authentication</h3>
              <ol className="space-y-4 text-sm text-muted-foreground list-decimal list-inside">
                <li>Download an authentication app like Google Authenticator or Authy.</li>
                <li>Scan the QR code with your app or enter the code manually.</li>
                <li>Enter the verification code provided by your app below.</li>
              </ol>
              
              <div className="my-6 flex flex-col items-center">
                <div className="bg-muted w-40 h-40 mb-4 flex items-center justify-center text-sm text-muted-foreground">
                  [QR Code Placeholder]
                </div>
                <p className="text-sm font-mono">ABCD EFGH IJKL MNOP</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="verification-code">Verification code</FormLabel>
                  <Input 
                    id="verification-code" 
                    placeholder="Enter 6-digit code" 
                    className="w-full mt-1"
                    maxLength={6}
                  />
                </div>
                <Button onClick={handle2FASetupComplete}>Verify and Activate</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
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
          <Button variant="outline" className="w-full">
            Logout from all other devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 