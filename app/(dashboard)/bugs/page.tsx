import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronDown,
  MoreHorizontal
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for bugs
const bugsData = [
  {
    id: "BUG-001",
    title: "User settings page crashes on save",
    status: "Open",
    priority: "High",
    assignee: "John Doe",
    project: "User Portal",
    updatedAt: "2 hours ago"
  },
  {
    id: "BUG-002",
    title: "Search results pagination not working",
    status: "In Progress",
    priority: "Medium",
    assignee: "Sarah Kim",
    project: "Admin Dashboard",
    updatedAt: "5 hours ago"
  },
  {
    id: "BUG-003",
    title: "Form validation errors not displaying correctly",
    status: "Open",
    priority: "Low",
    assignee: "Unassigned",
    project: "User Portal",
    updatedAt: "1 day ago"
  },
  {
    id: "BUG-004",
    title: "Authentication fails after password reset",
    status: "In Progress",
    priority: "High",
    assignee: "Emma Chen",
    project: "Auth Service",
    updatedAt: "2 days ago"
  },
  {
    id: "BUG-005",
    title: "Mobile navigation does not collapse properly",
    status: "Open",
    priority: "Medium",
    assignee: "David Lee",
    project: "Mobile App",
    updatedAt: "3 days ago"
  }
]

export default function BugsPage() {
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
        <SiteHeader title="Bugs" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="space-y-8 px-4 lg:px-6">
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Bugs</h1>
                    <p className="text-muted-foreground">Track and manage issues across your projects</p>
                  </div>
                  <Button className="h-9 gap-1.5" asChild>
                    <Link href="/bugs/report">
                      <Plus className="h-4 w-4" />
                      Report Bug
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bugs..."
                      className="pl-8 h-9"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-[140px] h-9">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[140px] h-9">
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5 hidden md:flex">
                      <Filter className="h-3.5 w-3.5" />
                      More Filters
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="w-[120px]">Priority</TableHead>
                        <TableHead className="w-[150px]">Assignee</TableHead>
                        <TableHead className="w-[150px]">Project</TableHead>
                        <TableHead className="w-[150px]">Updated</TableHead>
                        <TableHead className="w-[40px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bugsData.map((bug) => (
                        <TableRow key={bug.id}>
                          <TableCell className="font-medium">{bug.id}</TableCell>
                          <TableCell>
                            <Link href={`/bugs/${bug.id}`} className="hover:underline">
                              {bug.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              bug.status === "Open" ? "border-blue-500 text-blue-500" :
                              bug.status === "In Progress" ? "border-amber-500 text-amber-500" :
                              "border-green-500 text-green-500"
                            }>
                              {bug.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              bug.priority === "High" ? "border-destructive text-destructive" :
                              bug.priority === "Medium" ? "border-amber-500 text-amber-500" :
                              "border-green-500 text-green-500"
                            }>
                              {bug.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{bug.assignee}</TableCell>
                          <TableCell>{bug.project}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{bug.updatedAt}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Assign to me</DropdownMenuItem>
                                <DropdownMenuItem>Change status</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Edit bug</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 