"use client"

import { useState } from "react"
import { Book, Search, BookOpen, FileText, Code, ChevronRight, LayoutDashboard, Home, FileCode, BookMarked, Filter, ExternalLink, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Documentation categories
const documentationCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of BugLense and set up your first project.",
    icon: Book,
    articles: [
      { title: "Introduction to BugLense", path: "/docs/intro" },
      { title: "Creating your first project", path: "/docs/first-project" },
      { title: "Setting up your team", path: "/docs/team-setup" },
      { title: "Installing SDK", path: "/docs/sdk-installation", isNew: true },
    ]
  },
  {
    title: "Integrations",
    description: "Connect BugLense with your existing tools and workflows.",
    icon: Code,
    articles: [
      { title: "GitHub Integration", path: "/docs/github" },
      { title: "Slack Integration", path: "/docs/slack" },
      { title: "Jira Integration", path: "/docs/jira" },
      { title: "API Integration", path: "/docs/api" },
    ]
  },
  {
    title: "Advanced Features",
    description: "Learn about advanced features and configurations.",
    icon: BookOpen,
    articles: [
      { title: "Custom Fields", path: "/docs/custom-fields" },
      { title: "Webhooks", path: "/docs/webhooks" },
      { title: "Role-based Permissions", path: "/docs/permissions" },
      { title: "Advanced Analytics", path: "/docs/advanced-analytics", isNew: true },
    ]
  }
]

// Tutorial cards
const tutorials = [
  {
    title: "Capturing and reporting bugs effectively",
    description: "Learn how to capture and report bugs with detailed information for faster resolution.",
    image: "/tutorial1.jpg",
    path: "/tutorials/capturing-bugs"
  },
  {
    title: "Setting up automated error tracking",
    description: "Configure BugLense to automatically capture errors in your application.",
    image: "/tutorial2.jpg",
    path: "/tutorials/automated-tracking"
  },
  {
    title: "Creating custom bug workflows",
    description: "Design custom workflows for different types of bugs and projects.",
    image: "/tutorial3.jpg",
    path: "/tutorials/custom-workflows"
  },
]

// FAQ items
const faqs = [
  {
    question: "How do I add team members to my project?",
    answer: "Navigate to Team settings, click 'Invite Member', enter their email address, and set permissions."
  },
  {
    question: "Can I customize the bug report form?",
    answer: "Yes, go to Project Settings > Forms > Bug Report and use the form editor to add, remove, or modify fields."
  },
  {
    question: "How can I integrate BugLense with my CI/CD pipeline?",
    answer: "Use our API or webhooks to integrate with your CI/CD pipeline. Check our Developer section for details."
  },
  {
    question: "Is there a limit to the number of projects I can create?",
    answer: "Free accounts are limited to 3 projects. Premium and Enterprise plans offer unlimited projects."
  },
]

// Top navigation links - removed Dashboard since we have "Back to Dashboard"
const navLinks = [
  { title: "Developer", href: "/developer", icon: FileCode },
  { title: "Help Center", href: "/help", icon: BookMarked }
]

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  
  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full border-b">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 font-medium transition-colors hover:text-primary"
            >
              <Home className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <link.icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Padding */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
            <p className="text-muted-foreground">
              Comprehensive guides and resources to help you use BugLense.
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Star className="mr-1 h-4 w-4" />
              Favorites
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <ExternalLink className="mr-1 h-4 w-4" />
              View API Reference
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Separator />

        <Tabs defaultValue="guides" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline-block">Filter</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="guides" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documentationCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="bg-muted/40 border-b pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.title}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a 
                            href={article.path} 
                            className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <div className="flex items-center">
                              <span>{article.title}</span>
                              {article.isNew && (
                                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="h-48 w-full bg-muted flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <a href={tutorial.path}>Read Tutorial</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline">View All Tutorials</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about BugLense and its features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2 hover:bg-muted/40 rounded-lg p-3 transition-colors duration-200">
                    <h3 className="font-medium text-primary">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    {index < faqs.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <div className="text-center p-6 border rounded-lg bg-muted/20">
              <h3 className="text-lg font-medium mb-2">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground mb-4">
                Check our help center or contact our support team for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default">
                  <a href="/help">Visit Help Center</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/help#contact">Contact Support</a>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 