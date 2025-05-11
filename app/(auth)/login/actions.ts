"use server"

import { redirect } from "next/navigation";

// This is a dummy login action for demonstration purposes only
export async function login(_: FormData) {
  // In a real app, this would validate credentials and authenticate the user
  
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always redirect to dashboard for demo
  redirect("/dashboard");
} 