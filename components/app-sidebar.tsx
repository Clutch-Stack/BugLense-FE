"use client"

import * as React from "react"
import {
  Bug,
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  HelpCircle,
  Book,
  Code
} from "lucide-react"
import Link from "next/link"
import { type Icon } from "@tabler/icons-react"

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

// Create wrapper components for Lucide icons to match Tabler icon type
const createIconWrapper = (LucideIcon: React.ElementType): Icon => {
  // Use React.ComponentPropsWithRef to get the correct props type
  const IconWrapper = (props: React.ComponentPropsWithoutRef<React.ElementType>) => <LucideIcon {...props} />;
  const iconName = typeof LucideIcon === 'function' && 'displayName' in LucideIcon 
    ? LucideIcon.displayName 
    : typeof LucideIcon === 'function' && 'name' in LucideIcon 
      ? LucideIcon.name 
      : 'Unknown';
  IconWrapper.displayName = `TablerIcon(${iconName})`;
  return IconWrapper;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMainItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: createIconWrapper(LayoutDashboard)
    },
    {
      title: "Projects",
      url: "/projects",
      icon: createIconWrapper(FolderKanban)
    },
    {
      title: "Bugs",
      url: "/bugs",
      icon: createIconWrapper(Bug)
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: createIconWrapper(BarChart3)
    },
    {
      title: "Team",
      url: "/team",
      icon: createIconWrapper(Users)
    },
  ];

  const navSecondaryItems = [
    {
      title: "Documentation",
      url: "/docs",
      icon: createIconWrapper(Book)
    },
    {
      title: "Developer",
      url: "/developer",
      icon: createIconWrapper(Code)
    },
    {
      title: "Settings",
      url: "/settings",
      icon: createIconWrapper(Settings)
    },
    {
      title: "Help",
      url: "/help",
      icon: createIconWrapper(HelpCircle)
    }
  ];

  const favorites: { name: string; url: string; icon: Icon }[] = [];

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
              <Link href="/">
                <Bug className="!size-5 text-primary" />
                <span className="text-base font-semibold">BugLense</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-3">
        <NavMain items={navMainItems} />
        {favorites.length > 0 && <NavDocuments items={favorites} />}
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
