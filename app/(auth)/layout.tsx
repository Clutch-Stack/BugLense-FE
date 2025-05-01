import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container flex items-center justify-end py-4">
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          {children}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} BugLense. All rights reserved.</p>
      </footer>
    </div>
  );
} 