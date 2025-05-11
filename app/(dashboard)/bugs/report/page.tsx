"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Globe, Laptop, Upload } from "lucide-react"

const bugFormSchema = z.object({
  title: z.string().min(5, {
    message: "Bug title must be at least 5 characters.",
  }).max(100, {
    message: "Bug title must not be longer than 100 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters."
  }),
  stepsToReproduce: z.string().min(5, {
    message: "Steps to reproduce must be at least 5 characters."
  }),
  expectedBehavior: z.string().optional(),
  actualBehavior: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  severity: z.enum(["Minor", "Major", "Critical", "Blocker"]),
  status: z.enum(["Open", "In Progress", "Resolved", "Closed"]).default("Open"),
  project: z.string(),
  assignee: z.string().optional(),
  browser: z.string().optional(),
  operatingSystem: z.string().optional(),
  device: z.string().optional(),
  screenSize: z.string().optional(),
  attachments: z.any().optional(),
  tags: z.array(z.string()).default([]),
  notifyOnChange: z.boolean().default(false),
})

type BugFormValues = z.infer<typeof bugFormSchema>

// Sample projects for dropdown
const projects = [
  { id: "1", name: "User Portal" },
  { id: "2", name: "Admin Dashboard" },
  { id: "3", name: "Auth Service" },
  { id: "4", name: "Mobile App" },
]

// Sample users for dropdown
const users = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Sarah Kim" },
  { id: "3", name: "Emma Chen" },
  { id: "4", name: "David Lee" },
]

// Sample browsers
const browsers = [
  "Chrome",
  "Firefox",
  "Safari",
  "Edge",
  "Opera",
  "Other"
]

// Sample operating systems
const operatingSystems = [
  "Windows 10",
  "Windows 11",
  "macOS",
  "Linux",
  "iOS",
  "Android",
  "Other"
]

// Sample devices
const devices = [
  "Desktop",
  "Laptop",
  "Tablet",
  "Mobile Phone",
  "Other"
]

// Sample screen sizes
const screenSizes = [
  "Small (<768px)",
  "Medium (768px - 1024px)",
  "Large (1024px - 1440px)",
  "Extra Large (>1440px)"
]

// Sample tags
const availableTags = [
  "UI",
  "UX",
  "Performance",
  "Security",
  "Functionality",
  "Data",
  "Integration",
  "Authentication",
  "Navigation",
  "Form",
  "Layout",
  "Responsive",
  "API"
]

const defaultValues: Partial<BugFormValues> = {
  title: "",
  description: "",
  stepsToReproduce: "",
  expectedBehavior: "",
  actualBehavior: "",
  priority: "Medium",
  severity: "Major",
  status: "Open",
  project: "",
  assignee: "",
  browser: "",
  operatingSystem: "",
  device: "",
  screenSize: "",
  tags: [],
  notifyOnChange: false
}

export default function ReportBugPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  
  const form = useForm<BugFormValues>({
    resolver: zodResolver(bugFormSchema),
    defaultValues,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
  }

  async function onSubmit(data: BugFormValues) {
    setIsLoading(true)
    
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData()
      
      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'attachments' && value !== undefined) {
          if (typeof value === 'object' && !Array.isArray(value)) {
            formData.append(key, JSON.stringify(value))
          } else {
            formData.append(key, String(value))
          }
        }
      })
      
      // Append the file if it exists
      if (selectedFile) {
        formData.append('attachments', selectedFile)
      }
      
      // Here you would normally send the formData to your API
      console.log("Bug data:", data)
      console.log("File:", selectedFile)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success("Bug reported successfully")
      router.push("/bugs")
    } catch (error) {
      toast.error("Failed to report bug")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3.5rem",
          "--spacing": "0.25rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Report Bug" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Report Bug</h1>
                    <p className="text-muted-foreground">
                      Provide detailed information to help the team understand and fix the issue
                    </p>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Report a Bug</CardTitle>
                    <CardDescription>
                      Please fill out the form with as much detail as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="mb-6 grid grid-cols-3 w-full md:w-fit">
                            <TabsTrigger value="details">Bug Details</TabsTrigger>
                            <TabsTrigger value="environment">Environment</TabsTrigger>
                            <TabsTrigger value="additional">Additional Info</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="details" className="space-y-6">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bug Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter a descriptive title" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    A clear and concise title that describes the issue
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name="project"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select project" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {projects.map(project => (
                                          <SelectItem key={project.id} value={project.name}>
                                            {project.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="assignee"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Assignee</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="">Unassigned</SelectItem>
                                        {users.map(user => (
                                          <SelectItem key={user.id} value={user.name}>
                                            {user.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe the bug in detail" 
                                      className="resize-none min-h-[120px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="stepsToReproduce"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Steps to Reproduce</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="List the steps to reproduce the bug" 
                                      className="resize-none min-h-[100px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Example: 1. Log in to the system, 2. Navigate to settings, 3. Click save without entering data
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name="expectedBehavior"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expected Behavior</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="What should happen" 
                                        className="resize-none min-h-[100px]"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="actualBehavior"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Actual Behavior</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="What happened instead" 
                                        className="resize-none min-h-[100px]"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Critical">Critical</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      How important is fixing this issue
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="severity"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Severity</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select severity" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Minor">Minor</SelectItem>
                                        <SelectItem value="Major">Major</SelectItem>
                                        <SelectItem value="Critical">Critical</SelectItem>
                                        <SelectItem value="Blocker">Blocker</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      How severe is the impact of this bug
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="text-right">
                              <Button 
                                type="button" 
                                onClick={() => setActiveTab("environment")}
                              >
                                Next: Environment Details
                              </Button>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="environment" className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-2">
                                  <Globe className="h-5 w-5" />
                                  <h3 className="font-medium">Browser Information</h3>
                                </div>
                                
                                <FormField
                                  control={form.control}
                                  name="browser"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Browser</FormLabel>
                                      <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select browser" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {browsers.map(browser => (
                                            <SelectItem key={browser} value={browser}>
                                              {browser}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="operatingSystem"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Operating System</FormLabel>
                                      <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select OS" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {operatingSystems.map(os => (
                                            <SelectItem key={os} value={os}>
                                              {os}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-2">
                                  <Laptop className="h-5 w-5" />
                                  <h3 className="font-medium">Device Information</h3>
                                </div>
                                
                                <FormField
                                  control={form.control}
                                  name="device"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Device Type</FormLabel>
                                      <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select device" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {devices.map(device => (
                                            <SelectItem key={device} value={device}>
                                              {device}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="screenSize"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Screen Size</FormLabel>
                                      <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select screen size" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {screenSizes.map(size => (
                                            <SelectItem key={size} value={size}>
                                              {size}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-6">
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setActiveTab("details")}
                              >
                                Back: Bug Details
                              </Button>
                              <Button 
                                type="button"
                                onClick={() => setActiveTab("additional")}
                              >
                                Next: Additional Info
                              </Button>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="additional" className="space-y-6">
                            <div className="space-y-6">
                              <FormItem className="space-y-4">
                                <FormLabel>Attachments</FormLabel>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                  <p className="mb-2 text-sm text-muted-foreground text-center">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground text-center mb-4">
                                    PNG, JPG, PDF or ZIP (max. 10MB)
                                  </p>
                                  <Input
                                    type="file"
                                    className="hidden"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                  />
                                  <label htmlFor="file-upload">
                                    <Button type="button" variant="outline" size="sm">
                                      Select File
                                    </Button>
                                  </label>
                                  {selectedFile && (
                                    <p className="mt-2 text-sm font-medium">
                                      {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                                    </p>
                                  )}
                                </div>
                              </FormItem>
                              
                              <FormField
                                control={form.control}
                                name="tags"
                                render={() => (
                                  <FormItem>
                                    <div className="mb-4">
                                      <FormLabel>Tags</FormLabel>
                                      <FormDescription>
                                        Select tags that apply to this bug
                                      </FormDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {availableTags.map((tag) => (
                                        <FormField
                                          key={tag}
                                          control={form.control}
                                          name="tags"
                                          render={({ field }) => {
                                            return (
                                              <FormItem
                                                key={tag}
                                                className="flex flex-row items-start space-x-2 space-y-0"
                                              >
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value?.includes(tag)}
                                                    onCheckedChange={(checked) => {
                                                      return checked
                                                        ? field.onChange([...field.value, tag])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                              (value) => value !== tag
                                                            )
                                                          )
                                                    }}
                                                  />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm cursor-pointer">
                                                  {tag}
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
                                name="notifyOnChange"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>
                                        Notify me when changes are made to this bug
                                      </FormLabel>
                                      <FormDescription>
                                        You&apos;ll receive email notifications when updates are made.
                                      </FormDescription>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="flex justify-between mt-6">
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setActiveTab("environment")}
                              >
                                Back: Environment Details
                              </Button>
                              <Button 
                                type="submit" 
                                disabled={isLoading}
                              >
                                {isLoading ? "Submitting..." : "Submit Bug Report"}
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 