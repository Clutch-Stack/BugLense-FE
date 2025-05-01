"use client"

import * as React from "react"
import {
  Bug,
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  Search,
  HelpCircle,
  Clock,
  Star,
  Database,
  FileText,
  AlertCircle,
  Layers
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    initials: "JD"
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Bugs",
      url: "/bugs",
      icon: Bug,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Team",
      url: "/team",
      icon: Users,
    },
  ],
  navCategories: [
    {
      title: "Priority",
      icon: AlertCircle,
      isActive: true,
      url: "#",
      items: [
        {
          title: "High Priority",
          url: "#",
        },
        {
          title: "Medium Priority",
          url: "#",
        },
        {
          title: "Low Priority",
          url: "#",
        },
      ],
    },
    {
      title: "Status",
      icon: Layers,
      url: "#",
      items: [
        {
          title: "Open",
          url: "#",
        },
        {
          title: "In Progress",
          url: "#",
        },
        {
          title: "Resolved",
          url: "#",
        },
      ],
    },
    {
      title: "Recently Viewed",
      icon: Clock,
      url: "#",
      items: [
        {
          title: "User Portal",
          url: "#",
        },
        {
          title: "Admin Dashboard",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  favorites: [
    {
      name: "User Portal",
      url: "#",
      icon: Star,
    },
    {
      name: "Admin Dashboard",
      url: "#",
      icon: Star,
    },
    {
      name: "Auth Service",
      url: "#",
      icon: Star,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <Bug className="!size-5 text-primary" />
                <span className="text-base font-semibold">BugLense</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.favorites} title="Favorites" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
