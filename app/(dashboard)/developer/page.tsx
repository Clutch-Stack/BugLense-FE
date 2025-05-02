"use client"

import { useState } from "react"
import { Code, Book, Package, Globe, CopyIcon, CheckIcon, MessageSquareShare, LayoutDashboard, Home, FileCode, BookMarked, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Sample API keys for demonstration
const API_KEY = "bug_sk_1a2b3c4d5e6f7g8h9i0j"
const CLIENT_KEY = "bug_pk_9i8h7g6f5e4d3c2b1a0"

// Top navigation links - removed Dashboard since we have "Back to Dashboard"
const navLinks = [
  { title: "Documentation", href: "/docs", icon: BookMarked },
  { title: "Help Center", href: "/help", icon: HelpCircle }
]

export default function DeveloperPage() {
  const [showAPIKey, setShowAPIKey] = useState(false)
  const [copiedAPI, setCopiedAPI] = useState(false)
  const [copiedClient, setCopiedClient] = useState(false)

  const copyToClipboard = (text: string, type: 'api' | 'client') => {
    navigator.clipboard.writeText(text)
    if (type === 'api') {
      setCopiedAPI(true)
      setTimeout(() => setCopiedAPI(false), 2000)
    } else {
      setCopiedClient(true)
      setTimeout(() => setCopiedClient(false), 2000)
    }
    toast({
      title: "Copied to clipboard",
      description: `${type === 'api' ? 'API' : 'Client'} key copied to clipboard.`,
    })
  }

  const regenerateKey = () => {
    toast({
      title: "API key regenerated",
      description: "Your new API key has been generated. Previous key will expire in 24 hours.",
    })
  }

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
            <h2 className="text-3xl font-bold tracking-tight">Developer</h2>
            <p className="text-muted-foreground">
              Access API documentation, SDKs, and integration examples.
            </p>
          </div>
        </div>

        <Separator />
        
        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2 bg-muted/40 border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquareShare className="h-5 w-5 text-primary" />
                Webhooks
              </CardTitle>
              <CardDescription>
                Configure event notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-4">
              <p className="text-sm text-muted-foreground">
                Set up webhooks to integrate BugLense with your systems and receive real-time event notifications.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/developer/webhooks">Manage Webhooks</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2 bg-muted/40 border-b">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                API Reference
              </CardTitle>
              <CardDescription>
                Explore the BugLense API
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-4">
              <p className="text-sm text-muted-foreground">
                Comprehensive API documentation with examples for all endpoints and operations.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a href="https://docs.buglense.com/api" target="_blank" rel="noopener noreferrer">View API Reference</a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2 bg-muted/40 border-b">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                SDKs
              </CardTitle>
              <CardDescription>
                Client libraries
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-4">
              <p className="text-sm text-muted-foreground">
                Official SDKs for various platforms to help you integrate BugLense into your applications.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a href="#sdks" onClick={() => document.getElementById('sdks-tab')?.click()}>View SDKs</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* API Keys Section */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
          <CardHeader className="bg-muted/40 border-b">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              API Keys
            </CardTitle>
            <CardDescription>
              Manage your API keys for integrating BugLense into your applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-medium">Server-side API Key</h3>
              <p className="text-sm text-muted-foreground">
                Use this key for backend API calls. Keep this key secure and never expose it in client-side code.
              </p>
              <div className="flex gap-2">
                <div className="border rounded-md px-3 py-2 flex-1 font-mono text-sm bg-muted">
                  {showAPIKey ? API_KEY : '•'.repeat(API_KEY.length)}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(API_KEY, 'api')}
                >
                  {copiedAPI ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAPIKey(!showAPIKey)}
                >
                  {showAPIKey ? "Hide" : "Show"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Client-side Key</h3>
              <p className="text-sm text-muted-foreground">
                Use this key in your client-side applications. This key has limited permissions.
              </p>
              <div className="flex gap-2">
                <div className="border rounded-md px-3 py-2 flex-1 font-mono text-sm">
                  {CLIENT_KEY}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(CLIENT_KEY, 'client')}
                >
                  {copiedClient ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={regenerateKey}>Regenerate API Keys</Button>
          </CardFooter>
        </Card>

        {/* Documentation Tabs */}
        <Tabs defaultValue="api" id="docs-tabs">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="sdks" id="sdks-tab">SDKs</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          <TabsContent value="api" className="space-y-4">
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-muted/40 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  API Documentation
                </CardTitle>
                <CardDescription>
                  Comprehensive documentation for the BugLense API.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    All API requests require authentication using your API key.
                  </p>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
{`// Example request with API key
fetch('https://api.buglense.com/v1/bugs', {
  headers: {
    'Authorization': 'Bearer ${API_KEY}',
    'Content-Type': 'application/json'
  }
})`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Endpoints</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold">GET /v1/bugs</h4>
                      <p className="text-sm text-muted-foreground">
                        Retrieve a list of bugs for your project.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">POST /v1/bugs</h4>
                      <p className="text-sm text-muted-foreground">
                        Create a new bug report.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">GET /v1/bugs/:id</h4>
                      <p className="text-sm text-muted-foreground">
                        Retrieve details for a specific bug.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Globe className="mr-2 h-4 w-4" />
                  <a href="https://docs.buglense.com/api" target="_blank" rel="noopener noreferrer">
                    View Full API Documentation
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-4" id="sdks">
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-muted/40 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Software Development Kits
                </CardTitle>
                <CardDescription>
                  Official SDKs for integrating BugLense into your applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* JavaScript SDK */}
                  <div className="border rounded-md p-4 hover:bg-muted/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-yellow-100 p-1 rounded-md">
                        <span className="text-yellow-800 text-lg font-bold">JS</span>
                      </div>
                      <h3 className="font-medium">JavaScript</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      For browser and Node.js applications.
                    </p>
                    <div className="bg-muted p-2 rounded-md mb-4">
                      <pre className="text-xs overflow-auto">
                        <code>npm install @buglense/js</code>
                      </pre>
                    </div>
                    <Button variant="outline" size="sm">View Documentation</Button>
                  </div>

                  {/* React SDK */}
                  <div className="border rounded-md p-4 hover:bg-muted/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 p-1 rounded-md">
                        <span className="text-blue-800 text-lg font-bold">R</span>
                      </div>
                      <h3 className="font-medium">React</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      For React applications.
                    </p>
                    <div className="bg-muted p-2 rounded-md mb-4">
                      <pre className="text-xs overflow-auto">
                        <code>npm install @buglense/react</code>
                      </pre>
                    </div>
                    <Button variant="outline" size="sm">View Documentation</Button>
                  </div>

                  {/* Python SDK */}
                  <div className="border rounded-md p-4 hover:bg-muted/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-100 p-1 rounded-md">
                        <span className="text-green-800 text-lg font-bold">Py</span>
                      </div>
                      <h3 className="font-medium">Python</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      For Python applications.
                    </p>
                    <div className="bg-muted p-2 rounded-md mb-4">
                      <pre className="text-xs overflow-auto">
                        <code>pip install buglense</code>
                      </pre>
                    </div>
                    <Button variant="outline" size="sm">View Documentation</Button>
                  </div>

                  {/* Mobile SDK */}
                  <div className="border rounded-md p-4 hover:bg-muted/40 transition-colors duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-100 p-1 rounded-md">
                        <span className="text-purple-800 text-lg font-bold">M</span>
                      </div>
                      <h3 className="font-medium">Mobile</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      For iOS and Android applications.
                    </p>
                    <div className="bg-muted p-2 rounded-md mb-4">
                      <pre className="text-xs overflow-auto">
                        <code>// See documentation for installation</code>
                      </pre>
                    </div>
                    <Button variant="outline" size="sm">View Documentation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-muted/40 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Integration Examples
                </CardTitle>
                <CardDescription>
                  Complete examples to help you integrate BugLense into your applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                {/* JavaScript Example */}
                <div className="space-y-2">
                  <h3 className="font-medium">JavaScript</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic JavaScript integration to track errors and submit bug reports.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
{`// Initialize BugLense in your application
import { BugLense } from '@buglense/js';

// Initialize with your client key
const buglense = new BugLense({
  clientKey: '${CLIENT_KEY}',
  projectId: 'your-project-id',
  environment: 'production'
});

// Automatically capture unhandled errors
buglense.start();

// Manually report a bug
buglense.reportBug({
  title: 'Button not working',
  description: 'The submit button is not responding to clicks',
  severity: 'medium',
  metadata: {
    browser: navigator.userAgent,
    url: window.location.href
  }
});`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* React Example */}
                <div className="space-y-2">
                  <h3 className="font-medium">React</h3>
                  <p className="text-sm text-muted-foreground">
                    React integration with error boundary and hooks.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">
                      <code>
{`// In your App.js or index.js
import { BugLenseProvider, useBugLense } from '@buglense/react';

function App() {
  return (
    <BugLenseProvider 
      clientKey="${CLIENT_KEY}" 
      projectId="your-project-id"
    >
      <YourApplication />
    </BugLenseProvider>
  );
}

// In a component
function YourComponent() {
  const { reportBug } = useBugLense();
  
  const handleError = (error) => {
    reportBug({
      title: 'Error in component',
      description: error.message,
      severity: 'high'
    });
  };
  
  return (
    // Your component content
  );
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Globe className="mr-2 h-4 w-4" />
                  <a href="https://github.com/buglense/examples" target="_blank" rel="noopener noreferrer">
                    View More Examples on GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 