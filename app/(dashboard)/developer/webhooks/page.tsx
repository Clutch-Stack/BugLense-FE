"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MessageSquareShare, Plus, Trash2, Globe, ArrowRight, Check, X, Pencil, Loader2, LayoutDashboard, Home, FileCode, BookMarked, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

const webhookFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  secret: z.string().min(8, {
    message: "Secret must be at least 8 characters.",
  }),
  events: z.array(z.string()).min(1, {
    message: "Select at least one event to trigger this webhook.",
  }),
  active: z.boolean().default(true),
})

type WebhookFormValues = z.infer<typeof webhookFormSchema>

// Sample webhook events
const webhookEvents = [
  { value: "bug.created", label: "Bug Created" },
  { value: "bug.updated", label: "Bug Updated" },
  { value: "bug.closed", label: "Bug Closed" },
  { value: "bug.reopened", label: "Bug Reopened" },
  { value: "bug.assigned", label: "Bug Assigned" },
  { value: "bug.comment.created", label: "Comment Created" },
  { value: "project.created", label: "Project Created" },
  { value: "project.updated", label: "Project Updated" },
  { value: "project.deleted", label: "Project Deleted" },
  { value: "team.member.added", label: "Team Member Added" },
  { value: "team.member.removed", label: "Team Member Removed" },
]

// Sample webhooks for demo
const sampleWebhooks = [
  {
    id: "wh_1",
    name: "GitHub Issues Sync",
    url: "https://github-integration.example.com/webhook",
    events: ["bug.created", "bug.updated", "bug.closed"],
    active: true,
    created: "2023-07-15T10:30:00",
    lastTriggered: "2023-07-26T08:45:00"
  },
  {
    id: "wh_2",
    name: "Slack Notifications",
    url: "https://slack-integration.example.com/hooks/buglense",
    events: ["bug.created", "bug.assigned"],
    active: true,
    created: "2023-06-10T15:20:00",
    lastTriggered: "2023-07-25T17:12:00"
  },
  {
    id: "wh_3",
    name: "CI/CD Pipeline",
    url: "https://jenkins.internal.example.com/buglense-hook",
    events: ["bug.created"],
    active: false,
    created: "2023-05-22T09:15:00",
    lastTriggered: "2023-06-30T11:30:00"
  }
]

// Top navigation links
const navLinks = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Developer", href: "/developer", icon: FileCode },
  { title: "Documentation", href: "/docs", icon: BookMarked },
  { title: "Help Center", href: "/help", icon: HelpCircle }
]

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState(sampleWebhooks)
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [webhookToDelete, setWebhookToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      name: "",
      url: "",
      secret: "",
      events: [],
      active: true,
    },
  })

  function onSubmit(data: WebhookFormValues) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (isEditing) {
        // Update existing webhook
        setWebhooks(prev => 
          prev.map(wh => 
            wh.id === isEditing 
              ? { 
                  ...wh, 
                  name: data.name, 
                  url: data.url, 
                  events: data.events,
                  active: data.active 
                } 
              : wh
          )
        )
        
        toast({
          title: "Webhook updated",
          description: `The webhook "${data.name}" has been updated.`,
        })
        
        setIsEditing(null)
      } else {
        // Add new webhook
        const newWebhook = {
          id: `wh_${Date.now()}`,
          name: data.name,
          url: data.url,
          events: data.events,
          active: data.active,
          created: new Date().toISOString(),
          lastTriggered: null
        }
        
        setWebhooks(prev => [...prev, newWebhook])
        
        toast({
          title: "Webhook created",
          description: `New webhook "${data.name}" has been created.`,
        })
        
        setIsAdding(false)
      }
      
      setIsLoading(false)
      form.reset()
    }, 1000)
  }

  function handleEdit(webhookId: string) {
    const webhook = webhooks.find(wh => wh.id === webhookId)
    
    if (webhook) {
      form.reset({
        name: webhook.name,
        url: webhook.url,
        secret: "********", // Placeholder for security
        events: webhook.events,
        active: webhook.active,
      })
      
      setIsEditing(webhookId)
      setIsAdding(true)
    }
  }

  function handleDeleteClick(webhookId: string) {
    setWebhookToDelete(webhookId)
    setIsDeleteDialogOpen(true)
  }

  function confirmDelete() {
    if (webhookToDelete) {
      setWebhooks(prev => prev.filter(wh => wh.id !== webhookToDelete))
      
      const webhook = webhooks.find(wh => wh.id === webhookToDelete)
      
      toast({
        title: "Webhook deleted",
        description: webhook ? `The webhook "${webhook.name}" has been deleted.` : "Webhook has been deleted.",
      })
      
      setIsDeleteDialogOpen(false)
      setWebhookToDelete(null)
    }
  }

  function toggleWebhookStatus(webhookId: string) {
    setWebhooks(prev => 
      prev.map(wh => 
        wh.id === webhookId 
          ? { ...wh, active: !wh.active } 
          : wh
      )
    )
    
    const webhook = webhooks.find(wh => wh.id === webhookId)
    const newStatus = webhook ? !webhook.active : false
    
    toast({
      title: `Webhook ${newStatus ? 'enabled' : 'disabled'}`,
      description: webhook 
        ? `The webhook "${webhook.name}" has been ${newStatus ? 'enabled' : 'disabled'}.` 
        : `Webhook has been ${newStatus ? 'enabled' : 'disabled'}.`,
    })
  }

  function cancelForm() {
    form.reset()
    setIsAdding(false)
    setIsEditing(null)
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full border-b">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 font-medium transition-colors hover:text-primary"
            >
              <Home className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <link.icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Padding */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Webhooks</h2>
            <p className="text-muted-foreground">
              Configure webhooks to receive real-time notifications for events in your BugLense projects.
            </p>
          </div>
          <Button onClick={() => {
            form.reset()
            setIsEditing(null)
            setIsAdding(true)
          }}>
            <Plus className="mr-2 h-4 w-4" /> Add Webhook
          </Button>
        </div>

        <Separator className="my-6" />

        {isAdding ? (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Webhook" : "Add New Webhook"}</CardTitle>
              <CardDescription>
                Configure a webhook endpoint to receive event notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Webhook Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., GitHub Integration" {...field} />
                        </FormControl>
                        <FormDescription>
                          A friendly name to identify this webhook.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payload URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/webhook" {...field} />
                        </FormControl>
                        <FormDescription>
                          The URL where webhook payloads will be sent.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder={isEditing ? "Leave blank to keep current secret" : "Enter a secure secret"} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Used to sign the webhook payload for verification.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="events"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Events</FormLabel>
                          <FormDescription>
                            Select the events that will trigger this webhook.
                          </FormDescription>
                        </div>
                        <div className="space-y-2">
                          {webhookEvents.map((event) => (
                            <FormField
                              key={event.value}
                              control={form.control}
                              name="events"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={event.value}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300"
                                        checked={field.value?.includes(event.value)}
                                        onChange={(e) => {
                                          const checked = e.target.checked
                                          if (checked) {
                                            field.onChange([...field.value, event.value])
                                          } else {
                                            field.onChange(
                                              field.value?.filter(
                                                (value) => value !== event.value
                                              )
                                            )
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {event.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Active
                          </FormLabel>
                          <FormDescription>
                            Enable or disable this webhook.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" type="button" onClick={cancelForm}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isEditing ? "Update Webhook" : "Create Webhook"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : webhooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <MessageSquareShare className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No webhooks configured</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Create your first webhook to start receiving event notifications.
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle>{webhook.name}</CardTitle>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        webhook.active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {webhook.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleWebhookStatus(webhook.id)}
                      >
                        {webhook.active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(webhook.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Globe className="h-3 w-3 mr-1" />
                    {webhook.url}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Events:</span>{' '}
                      <span className="text-muted-foreground">
                        {webhook.events.map(event => {
                          const eventObj = webhookEvents.find(e => e.value === event)
                          return eventObj ? eventObj.label : event
                        }).join(', ')}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Created:</span>{' '}
                      <span className="text-muted-foreground">
                        {new Date(webhook.created).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    {webhook.lastTriggered && (
                      <div className="text-sm">
                        <span className="font-medium">Last triggered:</span>{' '}
                        <span className="text-muted-foreground">
                          {new Date(webhook.lastTriggered).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Test Webhook
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Webhook</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this webhook? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 