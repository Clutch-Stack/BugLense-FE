"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  CardFooter,
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
import { useForm } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import { z } from "zod"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

const projectFormSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }).max(50, {
    message: "Project name must not be longer than 50 characters."
  }),
  projectId: z.string().min(2, {
    message: "Project ID must be at least 2 characters.",
  }).max(20, {
    message: "Project ID must not be longer than 20 characters."
  }).regex(/^[a-z0-9-]+$/, {
    message: "Project ID can only contain lowercase letters, numbers, and hyphens."
  }),
  description: z.string().max(500, {
    message: "Description must not be longer than 500 characters."
  }).optional(),
  category: z.string({
    required_error: "Please select a project category."
  }),
  status: z.enum(["Planning", "Active", "On Hold", "Completed"]),
  dueDate: z.string().optional(),
  enableAutomatedLogging: z.boolean().default(false),
  errorLoggingLevel: z.enum(["None", "Errors", "Warnings", "All"]).default("None"),
  performanceMonitoring: z.boolean().default(false),
  crashReporting: z.boolean().default(false),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

const defaultValues: Partial<ProjectFormValues> = {
  name: "",
  projectId: "",
  description: "",
  category: "",
  status: "Planning",
  dueDate: "",
  enableAutomatedLogging: false,
  errorLoggingLevel: "None",
  performanceMonitoring: false,
  crashReporting: false,
}

// Project categories
const projectCategories = [
  { value: "web", label: "Web Application" },
  { value: "mobile", label: "Mobile Application" },
  { value: "desktop", label: "Desktop Application" },
  { value: "api", label: "API / Backend Service" },
  { value: "library", label: "Library / Framework" },
  { value: "other", label: "Other" },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState<string[]>([])
  const [newMember, setNewMember] = useState("")
  
  const form = useForm<ProjectFormValues>({
    defaultValues,
    resolver: async (values) => {
      const result = projectFormSchema.safeParse(values);
      if (result.success) {
        return {
          values: result.data,
          errors: {},
        };
      } else {
        const errors = {};
        result.error.errors.forEach((error) => {
          const path = error.path.join(".");
          errors[path] = {
            type: "validation",
            message: error.message,
          };
        });
        return {
          values: {},
          errors,
        };
      }
    },
  })

  // Generate a project ID based on the project name
  const generateProjectId = (name: string) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 20);
  };

  // Auto-generate project ID when name changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        const projectId = generateProjectId(value.name as string);
        form.setValue("projectId", projectId);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  // Add team member
  const addMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  // Remove team member
  const removeMember = (memberToRemove: string) => {
    setMembers(members.filter(member => member !== memberToRemove));
  };

  async function onSubmit(values: ProjectFormValues) {
    setIsLoading(true)
    
    try {
      // Validate the data with Zod
      const result = projectFormSchema.safeParse(values);
      
      if (!result.success) {
        const errors = result.error.flatten();
        console.error("Validation errors:", errors);
        toast.error("Please fix the form errors before submitting");
        setIsLoading(false);
        return;
      }
      
      const data = result.data;
      
      // Here you would normally send the data to your API
      const projectData = {
        ...data,
        members
      };
      
      console.log("Project data:", projectData)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Project created successfully")
      router.push("/projects")
    } catch (error) {
      toast.error("Failed to create project")
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
        <SiteHeader title="Create Project" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>New Project</CardTitle>
                    <CardDescription>
                      Create a new project to track bugs and collaborate with your team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter project name" {...field} />
                                </FormControl>
                                <FormDescription>
                                  This is the name that will be displayed for your project.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project ID</FormLabel>
                                <FormControl>
                                  <Input placeholder="project-id" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Unique identifier for your project (auto-generated, but can be customized).
                                </FormDescription>
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
                                  placeholder="Enter project description" 
                                  className="resize-none min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {projectCategories.map((category) => (
                                      <SelectItem key={category.value} value={category.value}>
                                        {category.label}
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
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Planning">Planning</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Team Members Section */}
                        <div>
                          <FormLabel>Team Members</FormLabel>
                          <FormDescription className="mb-2">
                            Add team members who will have access to this project.
                          </FormDescription>
                          
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Enter email address"
                              value={newMember}
                              onChange={(e) => setNewMember(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addMember();
                                }
                              }}
                            />
                            <Button type="button" variant="outline" onClick={addMember}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {members.map((member, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {member}
                                <button
                                  type="button"
                                  onClick={() => removeMember(member)}
                                  className="ml-1 rounded-full w-4 h-4 inline-flex items-center justify-center hover:bg-muted"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Automated Bug Logging Section */}
                        <div className="border rounded-lg p-4 space-y-4">
                          <div>
                            <h3 className="text-lg font-medium">Automated Bug Logging</h3>
                            <p className="text-sm text-muted-foreground">
                              Configure automated error tracking and bug detection for your project.
                            </p>
                          </div>

                          <FormField
                            control={form.control}
                            name="enableAutomatedLogging"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                  <FormLabel>Enable Automated Logging</FormLabel>
                                  <FormDescription>
                                    Automatically capture errors and issues in your application.
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

                          {form.watch("enableAutomatedLogging") && (
                            <>
                              <FormField
                                control={form.control}
                                name="errorLoggingLevel"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Error Logging Level</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select logging level" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Errors">Errors only</SelectItem>
                                        <SelectItem value="Warnings">Errors & Warnings</SelectItem>
                                        <SelectItem value="All">All (Verbose)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      Control what types of issues are logged automatically.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                <FormField
                                  control={form.control}
                                  name="performanceMonitoring"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                      <div className="space-y-0.5">
                                        <FormLabel>Performance Monitoring</FormLabel>
                                        <FormDescription>
                                          Track performance metrics and bottlenecks.
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

                                <FormField
                                  control={form.control}
                                  name="crashReporting"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                      <div className="space-y-0.5">
                                        <FormLabel>Crash Reporting</FormLabel>
                                        <FormDescription>
                                          Capture detailed crash reports with stack traces.
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
                              </div>
                            </>
                          )}
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create Project"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 