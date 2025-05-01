"use client"

import * as React from "react"
import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SiteHeader({ title = "Dashboard" }: { title?: string }) {
  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New bug reported",
      description: "A new high priority bug has been reported",
      time: "Just now"
    },
    {
      id: 2,
      title: "Bug assigned to you",
      description: "BUG-042 has been assigned to you",
      time: "2 hours ago"
    },
    {
      id: 3,
      title: "Comment on your bug",
      description: "Sarah commented on BUG-036",
      time: "Yesterday"
    }
  ];

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="relative ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border bg-background pl-8 pr-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-2 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className="p-3 border-b hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" className="w-full">View all</Button>
              </div>
            </PopoverContent>
          </Popover>
          <ThemeToggle />
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
