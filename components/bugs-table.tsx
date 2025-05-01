"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  MoreHorizontal, 
  ArrowUpDown, 
  ChevronDown,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Bug {
  id: string
  title: string
  status: string
  priority: string
  assignee: string
  project: string
  updatedAt: string
}

export function BugsTable({ data }: { data: Bug[] }) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedPriority, setSelectedPriority] = React.useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  // Filter data based on search term and filters
  const filteredData = data.filter((bug) => {
    const matchesSearch = searchTerm === "" || 
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPriority = selectedPriority === null || bug.priority === selectedPriority
    const matchesStatus = selectedStatus === null || bug.status === selectedStatus
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map(bug => bug.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  return (
    <div className="w-full px-4 lg:px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Bugs</h2>
            <p className="text-sm text-muted-foreground">
              View and manage your most recent bugs across all projects
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" className="h-8">Create Bug</Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bugs..."
                className="pl-8 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select 
              onValueChange={(value) => setSelectedPriority(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px] text-center">
                  <Checkbox 
                    checked={
                      filteredData.length > 0 && 
                      selectedRows.length === filteredData.length
                    }
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all bugs"
                  />
                </TableHead>
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
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No bugs found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((bug) => (
                  <TableRow key={bug.id}>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={selectedRows.includes(bug.id)}
                        onCheckedChange={() => toggleSelectRow(bug.id)}
                        aria-label={`Select bug ${bug.id}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{bug.id}</TableCell>
                    <TableCell>{bug.title}</TableCell>
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Assign to me</DropdownMenuItem>
                          <DropdownMenuItem>Change status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit bug</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 