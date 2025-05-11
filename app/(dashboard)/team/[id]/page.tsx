"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  User,
  Edit,
  Activity,
  FolderKanban,
  Bug,
  FileEdit
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define proper types for the data
type RecentActivity = {
  id: number;
  type: "bug" | "project" | "document" | "meeting" | "design" | "code" | "test";
  action: string;
  target: string;
  date: string;
}

type Project = {
  id: number;
  name: string;
  role: string;
  bugs: number;
}

type TeamMember = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  position: string;
  phone: string;
  location: string;
  joinedDate: string;
  status: string;
  lastActive: string;
  bio: string;
  assignedProjects: Project[];
  recentActivities: RecentActivity[];
}

// Sample team member data
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
    joinedDate: "Jan 15, 2023",
    status: "Active",
    lastActive: "2 hours ago",
    bio: "Experienced frontend developer with expertise in React, TypeScript and modern web frameworks. John has been with the team for over a year and has contributed to multiple key projects.",
    assignedProjects: [
      { id: 1, name: "User Portal", role: "Lead Developer", bugs: 3 },
      { id: 2, name: "Admin Dashboard", role: "Contributor", bugs: 2 },
      { id: 3, name: "Mobile App", role: "Reviewer", bugs: 1 }
    ],
    recentActivities: [
      { id: 1, type: "bug", action: "resolved", target: "Login form validation error", date: "2 hours ago" },
      { id: 2, type: "project", action: "commented on", target: "User Portal sprint planning", date: "1 day ago" },
      { id: 3, type: "bug", action: "assigned", target: "Navigation menu spacing issue", date: "2 days ago" },
      { id: 4, type: "document", action: "created", target: "API Integration Guide", date: "3 days ago" },
      { id: 5, type: "bug", action: "reported", target: "Data loading performance issue", date: "1 week ago" }
    ]
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
    joinedDate: "Mar 22, 2023",
    status: "Active",
    lastActive: "5 mins ago",
    bio: "Creative UI/UX designer with a strong focus on user-centered design principles. Sarah has helped shape the visual identity of several key products and brings a keen eye for detail to every project.",
    assignedProjects: [
      { id: 1, name: "User Portal", role: "Lead Designer", bugs: 0 },
      { id: 4, name: "Mobile App", role: "Lead Designer", bugs: 2 }
    ],
    recentActivities: [
      { id: 1, type: "design", action: "uploaded", target: "New homepage mockups", date: "10 mins ago" },
      { id: 2, type: "bug", action: "commented on", target: "Button alignment issue", date: "3 hours ago" },
      { id: 3, type: "project", action: "created", target: "Mobile app wireframes", date: "2 days ago" },
      { id: 4, type: "meeting", action: "scheduled", target: "Design review session", date: "3 days ago" }
    ]
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
    joinedDate: "Feb 10, 2023",
    status: "Away",
    lastActive: "1 day ago",
    bio: "Specialized in server-side architecture and API development. Mark has extensive experience with Node.js, Python, and database optimization. He's currently focused on improving the scalability of our core services.",
    assignedProjects: [
      { id: 3, name: "Auth Service", role: "Lead Developer", bugs: 8 }
    ],
    recentActivities: [
      { id: 1, type: "bug", action: "fixed", target: "Database connection timeout", date: "1 day ago" },
      { id: 2, type: "code", action: "committed", target: "API performance improvements", date: "2 days ago" },
      { id: 3, type: "bug", action: "assigned", target: "User authentication issue", date: "4 days ago" },
      { id: 4, type: "document", action: "updated", target: "Backend architecture docs", date: "1 week ago" }
    ]
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
    joinedDate: "Dec 5, 2022",
    status: "Active",
    lastActive: "Just now",
    bio: "Experienced project manager with a background in software development. Emma excels at coordinating cross-functional teams and ensuring projects are delivered on time and within scope.",
    assignedProjects: [
      { id: 1, name: "User Portal", role: "Project Manager", bugs: 0 },
      { id: 2, name: "Admin Dashboard", role: "Project Manager", bugs: 0 },
      { id: 3, name: "Auth Service", role: "Project Manager", bugs: 0 },
      { id: 4, name: "Mobile App", role: "Project Manager", bugs: 0 }
    ],
    recentActivities: [
      { id: 1, type: "meeting", action: "conducted", target: "Weekly sprint planning", date: "1 hour ago" },
      { id: 2, type: "project", action: "updated", target: "Q2 roadmap document", date: "3 hours ago" },
      { id: 3, type: "bug", action: "prioritized", target: "Critical authentication issues", date: "1 day ago" },
      { id: 4, type: "meeting", action: "scheduled", target: "Team retrospective", date: "2 days ago" }
    ]
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
    joinedDate: "Apr 3, 2023",
    status: "Inactive",
    lastActive: "2 weeks ago",
    bio: "Detail-oriented QA engineer with extensive experience in test automation and quality assurance processes. David specializes in creating comprehensive test plans and identifying potential issues before they reach production.",
    assignedProjects: [],
    recentActivities: [
      { id: 1, type: "document", action: "created", target: "QA testing process document", date: "2 weeks ago" },
      { id: 2, type: "bug", action: "verified", target: "Login security fix", date: "2 weeks ago" },
      { id: 3, type: "test", action: "automated", target: "User registration flow", date: "3 weeks ago" },
      { id: 4, type: "bug", action: "reported", target: "Payment processing error", date: "3 weeks ago" }
    ]
  }
]

export default function MemberProfilePage() {
  const params = useParams()
  const memberId = Number(params.id)
  const [member, setMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchMember = () => {
      setTimeout(() => {
        const foundMember = memberData.find(m => m.id === memberId)
        setMember(foundMember || null)
        setLoading(false)
      }, 500)
    }

    fetchMember()
  }, [memberId])

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
          <SiteHeader title="Team Member" />
          <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
            <div className="animate-pulse">Loading member profile...</div>
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
          <SiteHeader title="Team Member" />
          <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] gap-4">
            <h1 className="text-2xl font-bold">Member Not Found</h1>
            <p className="text-muted-foreground">The team member you&apos;re looking for doesn&apos;t exist.</p>
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
        <SiteHeader title="Team Member" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="space-y-8 px-4 lg:px-6">
                <div className="mb-4">
                  <Button variant="ghost" className="mb-4" asChild>
                    <Link href="/team">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back to Team
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Profile Summary */}
                  <div className="w-full lg:w-1/3">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-2xl">{member.initials}</AvatarFallback>
                          </Avatar>
                          <CardTitle className="text-2xl">{member.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm mt-1 mb-3">
                            {member.role === "Owner" && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                            {member.role === "Admin" && <ShieldAlert className="h-4 w-4 text-amber-500" />}
                            {member.role === "Member" && <User className="h-4 w-4 text-slate-500" />}
                            <Badge variant={
                              member.role === "Owner" ? "default" : 
                              member.role === "Admin" ? "secondary" : "outline"
                            }>
                              {member.role}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{member.position}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="border-t">
                        <div className="space-y-4 py-3">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                                  {member.email}
                                </a>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                <a href={`tel:${member.phone}`} className="hover:underline">
                                  {member.phone}
                                </a>
                              </div>
                              <div className="flex items-start">
                                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div>Joined {member.joinedDate}</div>
                                  <div className="text-xs text-muted-foreground">Member for {calculateMembershipTime(member.joinedDate)}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Status</h3>
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                member.status === "Active" ? "bg-green-500" :
                                member.status === "Away" ? "bg-amber-500" : "bg-slate-500"
                              }`}></div>
                              <span>{member.status}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {member.lastActive === "Just now" ? 
                                  "(Just now)" : 
                                  `(Last active ${member.lastActive})`}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">About</h3>
                            <p className="text-sm">
                              {member.bio}
                            </p>
                          </div>
                          
                          <Button variant="outline" className="w-full mt-2" asChild>
                            <Link href={`/team/${member.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Member Details Tabs */}
                  <div className="w-full lg:w-2/3">
                    <Tabs defaultValue="activity" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="activity">
                          <Activity className="h-4 w-4 mr-2" />
                          Activity
                        </TabsTrigger>
                        <TabsTrigger value="projects">
                          <FolderKanban className="h-4 w-4 mr-2" />
                          Projects
                        </TabsTrigger>
                        <TabsTrigger value="bugs">
                          <Bug className="h-4 w-4 mr-2" />
                          Bugs
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="activity" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                              Track {member.name}&apos;s recent actions and contributions
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="relative space-y-4">
                              {member.recentActivities.map((activity: RecentActivity, index: number) => (
                                <div key={activity.id} className="flex">
                                  <div className="mr-4 flex flex-col items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                      {activity.type === "bug" && <Bug className="h-5 w-5 text-primary" />}
                                      {activity.type === "project" && <FolderKanban className="h-5 w-5 text-primary" />}
                                      {activity.type === "document" && <FileEdit className="h-5 w-5 text-primary" />}
                                      {activity.type === "meeting" && <Calendar className="h-5 w-5 text-primary" />}
                                      {activity.type === "design" && <Edit className="h-5 w-5 text-primary" />}
                                      {activity.type === "code" && <Activity className="h-5 w-5 text-primary" />}
                                      {activity.type === "test" && <Activity className="h-5 w-5 text-primary" />}
                                    </div>
                                    {index < member.recentActivities.length - 1 && (
                                      <div className="h-full w-px bg-border" />
                                    )}
                                  </div>
                                  <div className="flex flex-col pb-8">
                                    <div className="flex items-center">
                                      <p className="font-medium">
                                        {capitalizeFirstLetter(activity.action)} {activity.type}
                                      </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                      {activity.target}
                                    </p>
                                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                                      <Clock className="mr-1 h-3 w-3" />
                                      {activity.date}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="projects" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Assigned Projects</CardTitle>
                            <CardDescription>
                              Projects that {member.name} is currently working on
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {member.assignedProjects.length > 0 ? (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Assigned Bugs</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {member.assignedProjects.map((project: Project) => (
                                    <TableRow key={project.id}>
                                      <TableCell className="font-medium">
                                        <Link href={`/projects/${project.id}`} className="hover:underline text-primary">
                                          {project.name}
                                        </Link>
                                      </TableCell>
                                      <TableCell>{project.role}</TableCell>
                                      <TableCell>{project.bugs}</TableCell>
                                      <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                          <Link href={`/projects/${project.id}`}>
                                            View
                                          </Link>
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-8 text-center">
                                <FolderKanban className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                                <h3 className="text-lg font-medium">No Projects Assigned</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {member.name} is not currently assigned to any projects.
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="bugs" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Bug Activity</CardTitle>
                            <CardDescription>
                              Bugs reported, assigned to, and resolved by {member.name}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {member.assignedProjects.some((p: Project) => p.bugs > 0) ? (
                              <div className="space-y-6">
                                <div>
                                  <h3 className="text-sm font-medium mb-3">Assigned Bugs by Project</h3>
                                  <div className="space-y-3">
                                    {member.assignedProjects
                                      .filter((p: Project) => p.bugs > 0)
                                      .map((project: Project) => (
                                        <div key={project.id} className="flex items-center justify-between">
                                          <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                            <span>{project.name}</span>
                                          </div>
                                          <Badge variant="outline">{project.bugs}</Badge>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="text-sm font-medium mb-3">Recent Bug Activity</h3>
                                  <div className="space-y-3">
                                    {member.recentActivities
                                      .filter((a: RecentActivity) => a.type === "bug")
                                      .map((activity: RecentActivity) => (
                                        <div key={activity.id} className="rounded-lg border p-3">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <p className="font-medium">{activity.target}</p>
                                              <p className="text-sm text-muted-foreground">
                                                {capitalizeFirstLetter(activity.action)} {activity.date}
                                              </p>
                                            </div>
                                            <Badge 
                                              variant={
                                                activity.action === "resolved" ? "default" :
                                                activity.action === "assigned" ? "secondary" :
                                                "outline"
                                              }
                                            >
                                              {activity.action}
                                            </Badge>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Bug className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                                <h3 className="text-lg font-medium">No Bug Activity</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {member.name} has no recent bug-related activity.
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Helper functions
function calculateMembershipTime(joinedDate: string) {
  const joined = new Date(joinedDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - joined.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 30) {
    return `${diffDays} days`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} ${months === 1 ? 'month' : 'months'}`
  } else {
    const years = Math.floor(diffDays / 365)
    const remainingMonths = Math.floor((diffDays % 365) / 30)
    return `${years} ${years === 1 ? 'year' : 'years'}${remainingMonths > 0 ? ` ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}` : ''}`
  }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
} 