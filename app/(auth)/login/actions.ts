"use server"

import { redirect } from "next/navigation";

/**
 * Server action for handling user login
 */
export async function login(formData: FormData) {
  // Get credentials from form data
  const email = formData.get('email');
  const password = formData.get('password');
  
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }
  
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log for demo purposes
  console.log(`Login attempt for: ${email}`);
  
  // Redirect to dashboard
  redirect("/dashboard");
} 