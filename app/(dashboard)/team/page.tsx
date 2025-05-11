"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MoreHorizontal,
  Mail,
  Clock,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  User
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

// Sample team members data
const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    initials: "JD",
    role: "Admin",
    position: "Frontend Developer",
    joinedDate: "Jan 15, 2023",
    status: "Active",
    lastActive: "2 hours ago",
    assignedProjects: 3,
    assignedBugs: 7
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@example.com",
    avatar: "",
    initials: "SK",
    role: "Member",
    position: "UI/UX Designer",
    joinedDate: "Mar 22, 2023",
    status: "Active",
    lastActive: "5 mins ago",
    assignedProjects: 2,
    assignedBugs: 4
  },
  {
    id: 3,
    name: "Mark Williams",
    email: "mark@example.com",
    avatar: "",
    initials: "MW",
    role: "Member",
    position: "Backend Developer",
    joinedDate: "Feb 10, 2023",
    status: "Away",
    lastActive: "1 day ago",
    assignedProjects: 1,
    assignedBugs: 12
  },
  {
    id: 4,
    name: "Emma Chen",
    email: "emma@example.com",
    avatar: "",
    initials: "EC",
    role: "Owner",
    position: "Project Manager",
    joinedDate: "Dec 5, 2022",
    status: "Active",
    lastActive: "Just now",
    assignedProjects: 4,
    assignedBugs: 2
  },
  {
    id: 5,
    name: "David Lee",
    email: "david@example.com",
    avatar: "",
    initials: "DL",
    role: "Member",
    position: "QA Engineer",
    joinedDate: "Apr 3, 2023",
    status: "Inactive",
    lastActive: "2 weeks ago",
    assignedProjects: 0,
    assignedBugs: 0
  },
]

// Role permissions structure
type RolePermission = 'Owner' | 'Admin' | 'Member';

const rolePermissions: Record<RolePermission, string[]> = {
  Owner: [
    "Manage members and roles",
    "Access all projects and bugs",
    "Modify organization settings",
    "Delete organization",
    "Billing and subscription"
  ],
  Admin: [
    "Manage members and roles",
    "Access all projects and bugs",
    "Modify organization settings"
  ],
  Member: [
    "Access assigned projects",
    "Create and update bugs",
    "View team members"
  ]
}

export default function TeamPage() {
  const [members, setMembers] = useState(initialMembers)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    position: "",
    role: "Member"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")

  // Filter members based on search query and role filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === "All" || member.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  // Add new member handler
  const handleAddMember = () => {
    const id = members.length + 1
    const initials = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase()
    
    const memberToAdd = {
      id,
      name: newMember.name,
      email: newMember.email,
      avatar: "",
      initials,
      role: newMember.role,
      position: newMember.position,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Active",
      lastActive: "Just now",
      assignedProjects: 0,
      assignedBugs: 0
    }
    
    setMembers([...members, memberToAdd])
    setIsAddMemberDialogOpen(false)
    setNewMember({
      name: "",
      email: "",
      position: "",
      role: "Member"
    })
  }

  // Change member role handler
  const handleChangeRole = (memberId: number, newRole: string) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, role: newRole } 
        : member
    ))
  }

  // Remove member handler
  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId))
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
        <SiteHeader title="Team" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="space-y-8 px-4 lg:px-6">
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Team</h1>
                    <p className="text-muted-foreground">Manage your team members and their roles</p>
                  </div>
                  <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="h-9 gap-1.5">
                        <UserPlus className="h-4 w-4" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Team Member</DialogTitle>
                        <DialogDescription>
                          Add a new member to your team. They will receive an email invitation.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="name" className="text-right">
                            Name
                          </label>
                          <Input
                            id="name"
                            className="col-span-3"
                            value={newMember.name}
                            onChange={e => setNewMember({...newMember, name: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="email" className="text-right">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            className="col-span-3"
                            value={newMember.email}
                            onChange={e => setNewMember({...newMember, email: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="position" className="text-right">
                            Position
                          </label>
                          <Input
                            id="position"
                            className="col-span-3"
                            value={newMember.position}
                            onChange={e => setNewMember({...newMember, position: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="role" className="text-right">
                            Role
                          </label>
                          <Select 
                            value={newMember.role}
                            onValueChange={value => setNewMember({...newMember, role: value})}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Owner">Owner</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Member">Member</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddMember} disabled={!newMember.name || !newMember.email}>Add Member</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 w-full max-w-md">
                    <div className="relative w-full">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search by name, email, or position..."
                        className="w-full pl-9"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select
                      value={roleFilter}
                      onValueChange={setRoleFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Roles</SelectItem>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground whitespace-nowrap">Showing {filteredMembers.length} members</p>
                  </div>
                </div>

                <Card>
                  <CardHeader className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle>Team Members</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Member</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead className="hidden md:table-cell">Projects</TableHead>
                          <TableHead className="hidden lg:table-cell">Bugs</TableHead>
                          <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-sm text-muted-foreground">{member.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {member.role === "Owner" && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                                {member.role === "Admin" && <ShieldAlert className="h-4 w-4 text-amber-500" />}
                                {member.role === "Member" && <User className="h-4 w-4 text-slate-500" />}
                                <span>{member.role}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant={
                                member.status === "Active" ? "default" :
                                member.status === "Away" ? "outline" : "secondary"
                              }>
                                {member.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {member.assignedProjects}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {member.assignedBugs}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" />
                                {member.lastActive}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/team/${member.id}`}>
                                      <User className="mr-2 h-4 w-4" />
                                      <span>View Profile</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Send Email</span>
                                  </DropdownMenuItem>
                                  
                                  <DropdownMenuSeparator />
                                  
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                        <span>Change Role</span>
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Change Role for {member.name}</DialogTitle>
                                        <DialogDescription>
                                          Select a new role to assign to this team member.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                          <Select
                                            defaultValue={member.role}
                                            onValueChange={(value) => handleChangeRole(member.id, value)}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Owner">Owner</SelectItem>
                                              <SelectItem value="Admin">Admin</SelectItem>
                                              <SelectItem value="Member">Member</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        
                                        <div className="space-y-2 rounded-md border p-4">
                                          <h4 className="font-medium">Permissions for this role:</h4>
                                          <ul className="space-y-1 text-sm">
                                            {rolePermissions[member.role as keyof typeof rolePermissions]?.map((permission, index) => (
                                              <li key={index} className="flex items-center">
                                                <ShieldCheck className="mr-2 h-3.5 w-3.5 text-primary" />
                                                {permission}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <DropdownMenuSeparator />
                                  
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem className="text-red-600" onSelect={e => e.preventDefault()}>
                                        <span>Remove Member</span>
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Remove Team Member</DialogTitle>
                                        <DialogDescription>
                                          Are you sure you want to remove {member.name} from your team? This action cannot be undone.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter className="mt-4">
                                        <Button variant="outline">Cancel</Button>
                                        <Button variant="destructive" onClick={() => handleRemoveMember(member.id)}>
                                          Remove Member
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {filteredMembers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <p className="text-muted-foreground">No members found</p>
                                <Button 
                                  variant="link" 
                                  className="mt-2" 
                                  onClick={() => {
                                    setSearchQuery("")
                                    setRoleFilter("All")
                                  }}
                                >
                                  Clear filters
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Role Permissions</CardTitle>
                    <CardDescription>
                      Understanding the different permission levels for team members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold">Owner</h3>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {rolePermissions.Owner.map((permission, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-5 w-5 text-amber-500" />
                          <h3 className="font-semibold">Admin</h3>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {rolePermissions.Admin.map((permission, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-slate-500" />
                          <h3 className="font-semibold">Member</h3>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {rolePermissions.Member.map((permission, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-slate-500" />
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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