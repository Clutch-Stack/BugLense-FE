"use server"

import { redirect } from "next/navigation";

// This is a dummy registration action for demonstration purposes only
export async function register(formData: FormData): Promise<void> {
  // In a real app, this would validate and store the new user
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Registration for: ${name} (${email})`);
  
  // Redirect to dashboard for demo
  redirect("/dashboard");
} 