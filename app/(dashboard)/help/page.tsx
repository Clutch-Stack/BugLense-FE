"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { 
  FileQuestion, 
  MessageSquare, 
  HelpCircle, 
  InfoIcon, 
  BookOpen, 
  Sparkles, 
  SendIcon, 
  Check,
  AlertCircle
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

// Support ticket form schema
const supportTicketSchema = z.object({
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters",
  }),
  category: z.string({
    required_error: "Please select a category",
  }),
  priority: z.string({
    required_error: "Please select a priority level",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

type SupportTicketFormValues = z.infer<typeof supportTicketSchema>

export default function HelpPage() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicketFormValues | null>(null)
  
  // Initialize form with default values
  const form = useForm<SupportTicketFormValues>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      subject: "",
      category: "",
      priority: "medium",
      description: "",
      email: "",
    },
  })

  // Handle form submission
  function onSubmit(data: SupportTicketFormValues) {
    // Simulate submitting to an API
    console.log("Form submitted:", data)
    setSubmittedTicket(data)
    setIsSubmitDialogOpen(true)
    
    // Reset form after submission
    // form.reset() - We'll reset the form after the dialog is closed
    
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you as soon as possible.",
    })
  }

  // FAQ data
  const faqItems = [
    {
      question: "How do I create a new project?",
      answer: "To create a new project, navigate to the Projects page from the sidebar and click on the &apos;New Project&apos; button in the top right corner. Fill in the project details form and click &apos;Create Project&apos; to finish."
    },
    {
      question: "Can I invite team members to my project?",
      answer: "Yes, you can invite team members to your project from the Team page. Click on &apos;Add Member&apos; and enter their email address. They will receive an invitation to join your project."
    },
    {
      question: "How do I report a bug?",
      answer: "To report a bug, go to the Bugs page and click &apos;Report Bug&apos;. Fill in the bug report form with details about the issue, including steps to reproduce, expected behavior, and actual behavior."
    },
    {
      question: "What information should I include in a bug report?",
      answer: "A good bug report should include: a clear title, steps to reproduce the issue, expected behavior, actual behavior, and any relevant screenshots or error messages. This helps our team understand and fix the issue faster."
    },
    {
      question: "How do I track the status of reported bugs?",
      answer: "You can track the status of reported bugs on the Bugs page. Each bug has a status indicator that shows whether it&apos;s new, in progress, or resolved. You can also filter bugs by status."
    },
    {
      question: "How do I change my account settings?",
      answer: "To change your account settings, click on the Settings link in the sidebar. From there, you can update your profile information, notification preferences, and security settings."
    },
    {
      question: "How does the billing system work?",
      answer: "BugLense offers different subscription tiers based on your needs. You can view and manage your subscription from the Settings > Billing page. We offer monthly and annual billing options with discounts for annual commitments."
    },
    {
      question: "How can I get help if my question isn&apos;t answered here?",
      answer: "If your question isn&apos;t answered in the FAQ, you can submit a support ticket using the form on the Help page. Our support team will get back to you as soon as possible."
    }
  ]

  // Documentation links
  const documentationLinks = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using BugLense",
      icon: BookOpen,
      url: "#"
    },
    {
      title: "API Documentation",
      description: "Integrate BugLense with your systems",
      icon: FileQuestion,
      url: "#"
    },
    {
      title: "Best Practices",
      description: "Tips for effective bug tracking",
      icon: Sparkles,
      url: "#"
    },
    {
      title: "Release Notes",
      description: "See what's new in BugLense",
      icon: InfoIcon,
      url: "#"
    }
  ]

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
        <SiteHeader title="Help Center" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold">Help Center</h1>
                  <p className="text-muted-foreground">
                    Find answers, documentation, and support for BugLense
                  </p>
                </div>
                
                <Tabs defaultValue="faq" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="faq" className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" /> FAQ
                    </TabsTrigger>
                    <TabsTrigger value="docs" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Documentation
                    </TabsTrigger>
                    <TabsTrigger value="support" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Support
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* FAQ Tab */}
                  <TabsContent value="faq" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5" />
                          Frequently Asked Questions
                        </CardTitle>
                        <CardDescription>
                          Common questions and answers about using BugLense
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger className="text-left">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Documentation Tab */}
                  <TabsContent value="docs" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Documentation
                        </CardTitle>
                        <CardDescription>
                          Guides, tutorials, and reference materials for BugLense
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          {documentationLinks.map((doc, index) => (
                            <Card key={index} className="overflow-hidden">
                              <a href={doc.url} className="block">
                                <CardHeader className="p-4">
                                  <div className="flex items-center gap-2">
                                    <doc.icon className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                                  </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                  <p className="text-muted-foreground text-sm">{doc.description}</p>
                                </CardContent>
                                <div className="bg-muted/40 p-2 text-right">
                                  <span className="text-xs text-primary font-medium">View documentation →</span>
                                </div>
                              </a>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Support Tab */}
                  <TabsContent value="support" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          Contact Support
                        </CardTitle>
                        <CardDescription>
                          Submit a support ticket and we&apos;ll get back to you as soon as possible
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="subject"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Subject</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter the subject of your support request" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                              <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Category</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="account">Account Issues</SelectItem>
                                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                                        <SelectItem value="technical">Technical Problem</SelectItem>
                                        <SelectItem value="feature">Feature Request</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormLabel>Priority</FormLabel>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="critical">Critical</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe your issue or question in detail" 
                                      className="min-h-[120px]" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Please provide as much detail as possible to help us assist you better.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email" 
                                      placeholder="Enter your email address" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    We&apos;ll use this email to contact you about your support request.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="pt-2">
                              <Button 
                                type="submit" 
                                className="w-full md:w-auto"
                              >
                                <SendIcon className="mr-2 h-4 w-4" />
                                Submit Support Ticket
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      
      {/* Success Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Support Ticket Submitted
            </DialogTitle>
            <DialogDescription>
              Your support ticket has been successfully submitted. Our team will respond as soon as possible.
            </DialogDescription>
          </DialogHeader>
          
          {submittedTicket && (
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="grid gap-2">
                  <div className="font-medium">{submittedTicket.subject}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {submittedTicket.description}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Category:</span> 
                      <span className="capitalize">{submittedTicket.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Priority:</span> 
                      <span className="capitalize">{submittedTicket.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span>
                  You will receive a confirmation email at <span className="font-medium">{submittedTicket.email}</span> with your ticket details.
                </span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setIsSubmitDialogOpen(false)
                form.reset()
              }}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
} 