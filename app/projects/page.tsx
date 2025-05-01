import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  Clock, 
  Filter, 
  Plus, 
  ChevronDown,
  MoreHorizontal,
  Star,
  StarOff
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProjectsPage() {
  // Sample projects data
  const projects = [
    {
      id: 1,
      name: "User Portal",
      description: "Customer-facing web application",
      status: "Active",
      progress: 92,
      dueDate: "Nov 30, 2023",
      bugs: { total: 7, open: 3, resolved: 4 },
      members: [
        { id: 1, name: "John Doe", avatar: "", initials: "JD" },
        { id: 2, name: "Sarah Kim", avatar: "", initials: "SK" },
        { id: 3, name: "Mark Williams", avatar: "", initials: "MW" },
      ],
      favorite: true,
    },
    {
      id: 2,
      name: "Admin Dashboard",
      description: "Internal administration panel",
      status: "Active",
      progress: 78,
      dueDate: "Dec 15, 2023",
      bugs: { total: 12, open: 8, resolved: 4 },
      members: [
        { id: 1, name: "John Doe", avatar: "", initials: "JD" },
        { id: 4, name: "Emma Chen", avatar: "", initials: "EC" },
      ],
      favorite: false,
    },
    {
      id: 3,
      name: "Auth Service",
      description: "Authentication and authorization microservice",
      status: "In Progress",
      progress: 45,
      dueDate: "Jan 10, 2024",
      bugs: { total: 5, open: 5, resolved: 0 },
      members: [
        { id: 3, name: "Mark Williams", avatar: "", initials: "MW" },
        { id: 4, name: "Emma Chen", avatar: "", initials: "EC" },
        { id: 5, name: "David Lee", avatar: "", initials: "DL" },
      ],
      favorite: true,
    },
    {
      id: 4,
      name: "Mobile App",
      description: "Cross-platform mobile application",
      status: "Planning",
      progress: 10,
      dueDate: "Feb 28, 2024",
      bugs: { total: 0, open: 0, resolved: 0 },
      members: [
        { id: 2, name: "Sarah Kim", avatar: "", initials: "SK" },
        { id: 5, name: "David Lee", avatar: "", initials: "DL" },
      ],
      favorite: false,
    },
  ]

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="space-y-8 px-4 lg:px-6">
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">Manage and track your projects</p>
                  </div>
                  <Button className="h-9 gap-1.5">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Filter className="h-3.5 w-3.5" />
                      All Projects
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      Recently Updated
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Showing {projects.length} projects</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardHeader className="p-6 pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-xl flex items-center gap-2">
                              {project.name}
                              {project.favorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                            </CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Menu">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Project</DropdownMenuItem>
                              <DropdownMenuItem>View Bugs</DropdownMenuItem>
                              <DropdownMenuItem>Manage Team</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                {project.favorite ? (
                                  <>
                                    <StarOff className="h-4 w-4" />
                                    Remove from favorites
                                  </>
                                ) : (
                                  <>
                                    <Star className="h-4 w-4" />
                                    Add to favorites
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 pb-3">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <span className={`inline-block h-2 w-2 rounded-full ${
                                project.status === 'Active' ? 'bg-green-500' :
                                project.status === 'In Progress' ? 'bg-blue-500' :
                                project.status === 'Planning' ? 'bg-amber-500' : 'bg-gray-500'
                              }`}></span>
                              {project.status}
                            </div>
                            <div className="text-sm flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {project.dueDate}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{project.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  project.progress > 80 ? 'bg-green-500' :
                                  project.progress > 40 ? 'bg-blue-500' : 'bg-amber-500'
                                }`} 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="font-medium">{project.bugs.open}</span>
                              <span className="text-muted-foreground"> open bugs</span>
                            </div>
                            <div className="flex -space-x-2">
                              {project.members.map((member) => (
                                <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 bg-muted/40 flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          Updated 2 days ago
                        </div>
                        <Link 
                          href={`/projects/${project.id}`} 
                          className="text-xs text-primary hover:underline"
                        >
                          View details
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {/* New Project Card */}
                  <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">Create a new project</h3>
                        <p className="text-sm text-muted-foreground">Add a new project to track bugs and collaborate</p>
                      </div>
                      <Button className="mt-2">Create Project</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 