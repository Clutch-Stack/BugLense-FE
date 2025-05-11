"use server"

import { redirect } from "next/navigation";

// This is a dummy registration action for demonstration purposes only
export async function register(_: FormData) {
  // In a real app, this would validate and store the new user
  
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Redirect to dashboard for demo
  redirect("/dashboard");
} 