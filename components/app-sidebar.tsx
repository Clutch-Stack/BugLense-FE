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
import Link from "next/link"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMainItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban
    },
    {
      title: "Bugs",
      url: "/bugs",
      icon: Bug
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3
    },
    {
      title: "Team",
      url: "/team",
      icon: Users
    },
  ];

  const navSecondaryItems = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings
    },
    {
      title: "Help",
      url: "#",
      icon: HelpCircle
    },
    {
      title: "Search",
      url: "#",
      icon: Search
    },
  ];

  const favorites = [];

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    initials: "JD"
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r" {...props}>
      <SidebarHeader className="p-2 px-3">
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
      <SidebarContent className="pt-3">
        <NavMain items={navMainItems} />
        {favorites.length > 0 && <NavDocuments items={favorites} title="Favorites" />}
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
