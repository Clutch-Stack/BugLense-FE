"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuthStore } from "@/lib/stores";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global providers for the application
 */
export default function Providers({ children }: ProvidersProps) {
  const { isAuthenticated, token, refreshUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  // Protected routes
  const isAuthRoute = pathname.startsWith("/(auth)") || 
                      pathname === "/login" || 
                      pathname === "/register" || 
                      pathname === "/forgot-password";
  
  const isProtectedRoute = pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/projects") || 
                          pathname.startsWith("/bugs") || 
                          pathname.startsWith("/settings");

  // Refresh user data on app load if token exists
  useEffect(() => {
    if (token) {
      refreshUser().catch(() => {
        // If refresh fails, the auth store will handle logout
      });
    }
  }, [token, refreshUser]);

  // Auth redirect handling
  useEffect(() => {
    if (isAuthenticated && isAuthRoute) {
      // Redirect to dashboard if already logged in
      router.push("/dashboard");
    } else if (!isAuthenticated && isProtectedRoute) {
      // Redirect to login if trying to access protected route
      router.push("/login");
    }
  }, [isAuthenticated, isAuthRoute, isProtectedRoute, router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
} 