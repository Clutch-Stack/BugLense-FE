"use client";

import { BugsTable } from "@/components/bugs-table";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

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

                <BugsTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 