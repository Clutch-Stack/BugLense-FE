import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "./actions";
import { Bug, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <form action={forgotPassword}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-10 items-center justify-center rounded-md border">
                  <Bug className="size-6 text-primary" />
                </div>
                <span className="font-bold">BugLense</span>
              </Link>
              <h1 className="text-xl font-bold">Reset your password</h1>
              <div className="text-center text-sm text-muted-foreground">
                Enter your email and we&apos;ll send you a link to reset your password
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-sm text-primary inline-flex items-center underline underline-offset-4"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </form>
        <div className="text-center text-xs text-muted-foreground">
          If you don&apos;t have an account, you can{" "}
          <Link href="/register" className="underline underline-offset-4">
            sign up here
          </Link>.
        </div>
      </div>
    </div>
  );
} 