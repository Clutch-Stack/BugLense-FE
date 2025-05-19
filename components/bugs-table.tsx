"use client"

import * as React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { useBugStore } from "@/lib/stores"
import { Bug, BugPriority, BugStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Copy,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loading } from "@/components/ui/loading"

export function BugsTable({ projectId }: { projectId?: string }) {
  const {
    bugs,
    filteredBugs,
    isLoading,
    error,
    fetchBugs,
    fetchBugsByProject,
    setSearchTerm,
    setFilter,
    resetFilters
  } = useBugStore()

  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  // Fetch bugs when component mounts
  useEffect(() => {
    if (projectId) {
      fetchBugsByProject(projectId)
    } else {
      fetchBugs()
    }
  }, [projectId, fetchBugs, fetchBugsByProject])

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setFilter('status', value === 'all' ? null : value)
  }

  // Handle priority filter change
  const handlePriorityChange = (value: string) => {
    setFilter('priority', value === 'all' ? null : value)
  }

  // Handle row selection
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  // Handle "select all" checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === filteredBugs.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredBugs.map((bug) => bug.id))
    }
  }

  if (isLoading) {
    return <Loading skeleton text="Loading bugs..." />
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex justify-between items-center">
          <span>Failed to load bugs: {error}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => projectId ? fetchBugsByProject(projectId) : fetchBugs()}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bugs..."
            className="pl-8 h-9"
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value={BugStatus.OPEN}>Open</SelectItem>
              <SelectItem value={BugStatus.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={BugStatus.RESOLVED}>Resolved</SelectItem>
              <SelectItem value={BugStatus.CLOSED}>Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value={BugPriority.HIGH}>High</SelectItem>
              <SelectItem value={BugPriority.MEDIUM}>Medium</SelectItem>
              <SelectItem value={BugPriority.LOW}>Low</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 hidden md:flex"
            onClick={() => resetFilters()}
          >
            <Filter className="h-3.5 w-3.5" />
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={
                    filteredBugs.length > 0 &&
                    selectedRows.length === filteredBugs.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
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
            {filteredBugs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6">
                  No bugs found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredBugs.map((bug) => (
                <TableRow key={bug.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(bug.id)}
                      onCheckedChange={() => handleRowSelect(bug.id)}
                      aria-label={`Select bug ${bug.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{bug.id}</TableCell>
                  <TableCell>
                    <Link href={`/bugs/${bug.id}`} className="hover:underline">
                      {bug.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        bug.status === BugStatus.OPEN && "border-blue-500 text-blue-500",
                        bug.status === BugStatus.IN_PROGRESS && "border-amber-500 text-amber-500",
                        bug.status === BugStatus.RESOLVED && "border-green-500 text-green-500",
                        bug.status === BugStatus.CLOSED && "border-slate-500 text-slate-500"
                      )}
                    >
                      {bug.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        bug.priority === BugPriority.HIGH && "border-destructive text-destructive",
                        bug.priority === BugPriority.MEDIUM && "border-amber-500 text-amber-500",
                        bug.priority === BugPriority.LOW && "border-green-500 text-green-500"
                      )}
                    >
                      {bug.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{bug.assigneeId || "Unassigned"}</TableCell>
                  <TableCell>{bug.projectId}</TableCell>
                  <TableCell>{new Date(bug.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
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
  )
} 