"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Sample team member data - same as in [id]/page.tsx
const memberData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    initials: "JD",
    role: "Admin",
    position: "Frontend Developer",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced frontend developer with expertise in React, TypeScript and modern web frameworks. John has been with the team for over a year and has contributed to multiple key projects.",
    joinedDate: "Jan 15, 2023",
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@example.com",
    avatar: "",
    initials: "SK",
    role: "Member",
    position: "UI/UX Designer",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    bio: "Creative UI/UX designer with a strong focus on user-centered design principles. Sarah has helped shape the visual identity of several key products and brings a keen eye for detail to every project.",
    joinedDate: "Mar 22, 2023",
    status: "Active"
  },
  {
    id: 3,
    name: "Mark Williams",
    email: "mark@example.com",
    avatar: "",
    initials: "MW",
    role: "Member",
    position: "Backend Developer",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    bio: "Specialized in server-side architecture and API development. Mark has extensive experience with Node.js, Python, and database optimization. He's currently focused on improving the scalability of our core services.",
    joinedDate: "Feb 10, 2023",
    status: "Away"
  },
  {
    id: 4,
    name: "Emma Chen",
    email: "emma@example.com",
    avatar: "",
    initials: "EC",
    role: "Owner",
    position: "Project Manager",
    phone: "+1 (555) 789-0123",
    location: "Seattle, WA",
    bio: "Experienced project manager with a background in software development. Emma excels at coordinating cross-functional teams and ensuring projects are delivered on time and within scope.",
    joinedDate: "Dec 5, 2022",
    status: "Active"
  },
  {
    id: 5,
    name: "David Lee",
    email: "david@example.com",
    avatar: "",
    initials: "DL",
    role: "Member",
    position: "QA Engineer",
    phone: "+1 (555) 321-6547",
    location: "Chicago, IL",
    bio: "Detail-oriented QA engineer with extensive experience in test automation and quality assurance processes. David specializes in creating comprehensive test plans and identifying potential issues before they reach production.",
    joinedDate: "Apr 3, 2023",
    status: "Inactive"
  }
]

// Form schema with validation
const memberFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string(),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  location: z.string(),
  bio: z.string(),
  status: z.string()
})

type MemberFormValues = z.infer<typeof memberFormSchema>

// Define a proper type for member instead of using any
type TeamMember = z.infer<typeof memberFormSchema> & {
  id: number;
  avatar: string;
  initials: string;
  joinedDate: string;
}

export default function EditMemberPage() {
  const params = useParams()
  const router = useRouter()
  const memberId = Number(params.id)
  const [member, setMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      position: "",
      phone: "",
      location: "",
      bio: "",
      status: ""
    },
  })

  useEffect(() => {
    // Simulate API fetch
    const fetchMember = () => {
      setTimeout(() => {
        const foundMember = memberData.find(m => m.id === memberId)
        
        if (foundMember) {
          setMember(foundMember)
          
          // Set form values from the fetched member
          form.reset({
            name: foundMember.name,
            email: foundMember.email,
            role: foundMember.role,
            position: foundMember.position,
            phone: foundMember.phone,
            location: foundMember.location,
            bio: foundMember.bio,
            status: foundMember.status
          })
        }
        
        setLoading(false)
      }, 500)
    }

    fetchMember()
  }, [memberId, form])

  const onSubmit = (data: MemberFormValues) => {
    setIsSaving(true)
    
    // Simulate API call to update the member
    setTimeout(() => {
      // In a real application, this would be an API call to update the member
      console.log("Updated member data:", data)
      
      toast.success("Member details updated successfully")
      setIsSaving(false)
      
      // Navigate back to the member profile page
      router.push(`/team/${memberId}`)
    }, 1000)
  }

  if (loading) {
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
          <SiteHeader title="Edit Team Member" />
          <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
            <div className="animate-pulse">Loading member details...</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (!member) {
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
          <SiteHeader title="Edit Team Member" />
          <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] gap-4">
            <h1 className="text-2xl font-bold">Member Not Found</h1>
            <p className="text-muted-foreground">The team member you're trying to edit doesn't exist.</p>
            <Button asChild>
              <Link href="/team">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Team
              </Link>
            </Button>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
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
        <SiteHeader title="Edit Team Member" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="space-y-6 px-4 lg:px-6">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/team/${memberId}`}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back to Profile
                    </Link>
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold tracking-tight">Edit Team Member</h1>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Member Information</CardTitle>
                    <CardDescription>
                      Update {member.name}&apos;s profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                  <Input placeholder="Frontend Developer" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="San Francisco, CA" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Owner">Owner</SelectItem>
                                      <SelectItem value="Admin">Admin</SelectItem>
                                      <SelectItem value="Member">Member</SelectItem>
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
                                        <SelectValue placeholder="Select a status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Active">Active</SelectItem>
                                      <SelectItem value="Away">Away</SelectItem>
                                      <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Brief description of the team member..."
                                  className="min-h-32 resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Add some details about the team member&apos;s experience, skills, and background.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push(`/team/${memberId}`)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? (
                              <>Saving Changes...</>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
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