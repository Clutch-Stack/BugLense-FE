import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { BugsTable } from "@/components/bugs-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  // Sample bugs data for the data table
  const bugsData = [
    {
      id: "BUG-001",
      title: "User settings page crashes on save",
      status: "Open",
      priority: "High",
      assignee: "John Doe",
      project: "User Portal",
      updatedAt: "2 hours ago",
    },
    {
      id: "BUG-002",
      title: "Search results pagination not working",
      status: "In Progress",
      priority: "Medium",
      assignee: "Sarah Kim",
      project: "Admin Dashboard",
      updatedAt: "5 hours ago",
    },
    {
      id: "BUG-003",
      title: "Form validation errors not displaying correctly",
      status: "Open",
      priority: "Low",
      assignee: "Unassigned",
      project: "User Portal",
      updatedAt: "1 day ago",
    },
    {
      id: "BUG-004",
      title: "Authentication fails after password reset",
      status: "In Progress",
      priority: "High",
      assignee: "Emma Chen",
      project: "Auth Service",
      updatedAt: "2 days ago",
    },
    {
      id: "BUG-005",
      title: "Mobile navigation does not collapse properly",
      status: "Open",
      priority: "Medium",
      assignee: "David Lee",
      project: "Mobile App",
      updatedAt: "3 days ago",
    },
  ];

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
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <BugsTable data={bugsData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 