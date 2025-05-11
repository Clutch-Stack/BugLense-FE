"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Bell, User, Shield } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

const tabs = [
  {
    title: "General",
    href: "/settings",
    icon: User,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "Billing",
    href: "/settings/billing",
    icon: CreditCard,
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: Shield,
  },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

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
        <SiteHeader title="Settings" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                  </p>
                </div>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                  <aside className="lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                      {tabs.map((tab) => (
                        <Link
                          key={tab.href}
                          href={tab.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                            pathname === tab.href
                              ? "bg-muted text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          <tab.icon className="h-4 w-4" />
                          {tab.title}
                        </Link>
                      ))}
                    </nav>
                  </aside>
                  <div className="flex-1">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 