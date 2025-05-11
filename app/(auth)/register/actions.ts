"use server"

import { redirect } from "next/navigation";

/**
 * Server action for handling user registration
 */
export async function register(formData: FormData) {
  // Get registration data from form
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  
  if (!name || typeof name !== 'string') {
    throw new Error('Name is required');
  }
  
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }
  
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required');
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log for demo purposes
  console.log(`Registration for: ${name} (${email})`);
  
  // Redirect to dashboard
  redirect("/dashboard");
} 