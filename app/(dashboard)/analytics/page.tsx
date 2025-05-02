"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

// Sample data for analytics
const bugsByPriority = [
  { name: "High", value: 32 },
  { name: "Medium", value: 48 },
  { name: "Low", value: 20 },
]

const bugsByStatus = [
  { name: "Open", value: 45 },
  { name: "In Progress", value: 25 },
  { name: "Resolved", value: 20 },
  { name: "Closed", value: 10 },
]

const bugsByProject = [
  { name: "User Portal", value: 35 },
  { name: "Admin Dashboard", value: 25 },
  { name: "Auth Service", value: 18 },
  { name: "Mobile App", value: 22 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  
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
        <SiteHeader title="Analytics" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">Track bug trends and insights across your projects</p>
                  </div>
                  <div className="flex items-center mt-3 md:mt-0">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Last 7 days</SelectItem>
                        <SelectItem value="month">Last 30 days</SelectItem>
                        <SelectItem value="quarter">Last 90 days</SelectItem>
                        <SelectItem value="year">Last 12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Total Bugs</CardTitle>
                      <CardDescription>All reported issues</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold">156</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <span className="i-lucide-trending-up mr-1"></span>
                          +12.5%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Open Bugs</CardTitle>
                      <CardDescription>Unresolved issues</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold">45</div>
                        <div className="text-sm text-amber-500 flex items-center">
                          <span className="i-lucide-minus mr-1"></span>
                          +3.2%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Avg Resolution Time</CardTitle>
                      <CardDescription>Time to fix bugs</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold">3.2d</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <span className="i-lucide-trending-down mr-1"></span>
                          -8.1%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Resolution Rate</CardTitle>
                      <CardDescription>Bugs fixed vs reported</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold">86%</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <span className="i-lucide-trending-up mr-1"></span>
                          +5.4%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Tabs defaultValue="trends" className="mb-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="trends">Bug Trends</TabsTrigger>
                    <TabsTrigger value="distribution">Bug Distribution</TabsTrigger>
                    <TabsTrigger value="resolution">Resolution Time</TabsTrigger>
                  </TabsList>
                  <TabsContent value="trends">
                    <Card>
                      <CardHeader>
                        <CardTitle>Bug Trends Over Time</CardTitle>
                        <CardDescription>
                          View how bugs are created and resolved over time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px]">
                          <ChartAreaInteractive />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="distribution">
                    <Card>
                      <CardHeader>
                        <CardTitle>Bug Distribution</CardTitle>
                        <CardDescription>
                          View bugs by priority, status, and project
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <h3 className="font-medium mb-2">By Priority</h3>
                            <div className="space-y-2">
                              {bugsByPriority.map(item => (
                                <div key={item.name} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div 
                                      className={`w-3 h-3 rounded-full mr-2 ${
                                        item.name === "High" ? "bg-red-500" : 
                                        item.name === "Medium" ? "bg-amber-500" : "bg-green-500"
                                      }`}
                                    ></div>
                                    <span>{item.name}</span>
                                  </div>
                                  <span className="font-medium">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">By Status</h3>
                            <div className="space-y-2">
                              {bugsByStatus.map(item => (
                                <div key={item.name} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div 
                                      className={`w-3 h-3 rounded-full mr-2 ${
                                        item.name === "Open" ? "bg-blue-500" : 
                                        item.name === "In Progress" ? "bg-amber-500" : 
                                        item.name === "Resolved" ? "bg-green-500" : "bg-gray-500"
                                      }`}
                                    ></div>
                                    <span>{item.name}</span>
                                  </div>
                                  <span className="font-medium">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">By Project</h3>
                            <div className="space-y-2">
                              {bugsByProject.map(item => (
                                <div key={item.name} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2 bg-indigo-500"></div>
                                    <span>{item.name}</span>
                                  </div>
                                  <span className="font-medium">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="resolution">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resolution Time Analysis</CardTitle>
                        <CardDescription>
                          Average time to resolve bugs by priority and project
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h3 className="font-medium mb-3">By Priority</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>High</span>
                                  <span className="font-medium">1.8 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>Medium</span>
                                  <span className="font-medium">3.5 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "55%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>Low</span>
                                  <span className="font-medium">5.2 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-3">By Project</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>User Portal</span>
                                  <span className="font-medium">2.7 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>Admin Dashboard</span>
                                  <span className="font-medium">3.1 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "58%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>Auth Service</span>
                                  <span className="font-medium">4.3 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span>Mobile App</span>
                                  <span className="font-medium">3.5 days</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "52%" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 