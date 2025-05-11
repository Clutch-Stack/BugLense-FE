"use client"

import { useState } from "react"
import { CreditCard, CheckCircle, Clock, AlertTriangle, PlusCircle, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const plans = [
  {
    id: "free",
    name: "Free",
    description: "For individuals and small teams getting started with bug tracking",
    price: "$0",
    features: [
      "Up to 3 projects",
      "5 team members",
      "100 bug reports per month",
      "Basic analytics",
      "7-day data retention"
    ],
    current: false
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams with advanced tracking needs",
    price: "$19",
    features: [
      "Unlimited projects",
      "Up to 15 team members",
      "1,000 bug reports per month",
      "Advanced analytics",
      "30-day data retention",
      "Priority support"
    ],
    current: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations requiring custom solutions",
    price: "$49",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Unlimited bug reports",
      "Advanced analytics with custom reports",
      "90-day data retention",
      "Dedicated support",
      "SSO & advanced security",
      "Custom integrations"
    ],
    current: false
  }
]

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [isAnnualBilling, setIsAnnualBilling] = useState(true)
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)
  
  // Mock payment methods
  const paymentMethods = [
    {
      id: "card-1",
      type: "card",
      cardBrand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true
    }
  ]

  // Mock invoice history
  const invoices = [
    {
      id: "INV-001",
      date: "Nov 1, 2023",
      amount: "$19.00",
      status: "Paid"
    },
    {
      id: "INV-002",
      date: "Dec 1, 2023",
      amount: "$19.00",
      status: "Paid"
    },
    {
      id: "INV-003",
      date: "Jan 1, 2024",
      amount: "$19.00",
      status: "Paid"
    }
  ]

  function handleUpgradePlan() {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsUpgradeDialogOpen(false)
      
      toast({
        title: "Subscription updated",
        description: `Your have successfully upgraded to the ${plans.find(p => p.id === selectedPlan)?.name} plan.`,
      })
    }, 1500)
  }

  function getBadgeForInvoiceStatus(status: string) {
    switch (status) {
      case "Paid":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
          <CheckCircle className="mr-1 h-3 w-3" /> {status}
        </Badge>
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
          <Clock className="mr-1 h-3 w-3" /> {status}
        </Badge>
      case "Failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
          <AlertTriangle className="mr-1 h-3 w-3" /> {status}
        </Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Current Plan: Pro</h3>
              <p className="text-muted-foreground">
                $19/month, billed annually
              </p>
            </div>
            <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
              <DialogTrigger asChild>
                <Button>Change Plan</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Change Subscription Plan</DialogTitle>
                  <DialogDescription>
                    Choose the plan that best fits your needs.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="billing-cycle" 
                      checked={isAnnualBilling}
                      onCheckedChange={setIsAnnualBilling}
                    />
                    <Label htmlFor="billing-cycle">Annual billing (save 20%)</Label>
                  </div>
                  
                  <RadioGroup 
                    value={selectedPlan} 
                    onValueChange={setSelectedPlan}
                    className="space-y-3"
                  >
                    {plans.map((plan) => (
                      <div 
                        key={plan.id}
                        className={`border rounded-lg p-4 transition-all ${
                          selectedPlan === plan.id ? "border-primary bg-muted/30" : "border-border"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={plan.id} id={plan.id} />
                          <Label htmlFor={plan.id} className="font-medium">{plan.name}</Label>
                          {plan.current && (
                            <Badge variant="outline" className="ml-auto">Current Plan</Badge>
                          )}
                        </div>
                        <div className="mt-2 pl-6">
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                          <p className="mt-1 font-medium">
                            {plan.price}{isAnnualBilling ? "/month, billed annually" : "/month"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <DialogFooter>
                  <Button 
                    onClick={handleUpgradePlan} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "Confirm Change"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="text-sm">
            <p className="font-medium">Your plan includes:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
              {plans.find(p => p.id === "pro")?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Next billing date: February 1, 2024</p>
                <p className="text-sm text-muted-foreground">
                  Your subscription will automatically renew on this date.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel Subscription</Button>
          <Button variant="outline">Update Billing Info</Button>
        </CardFooter>
      </Card>
      
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="font-medium">{method.cardBrand} •••• {method.last4}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires {method.expMonth}/{method.expYear}
                    {method.isDefault && " • Default"}
                  </p>
                </div>
              </div>
              <div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
      
      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your previous invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div 
                key={invoice.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{invoice.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.id} • {invoice.amount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getBadgeForInvoiceStatus(invoice.status)}
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 