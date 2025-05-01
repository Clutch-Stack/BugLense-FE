import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { 
  Search, 
  Bell, 
  Menu, 
  Home, 
  FolderKanban, 
  Bug, 
  Users, 
  Settings,
  LayoutDashboard,
  X
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sample notifications
  const notifications = [
    { id: 1, title: "New bug assigned", message: "User settings page crashes on save", time: "2 min ago", read: false },
    { id: 2, title: "Comment on bug", message: "Mark left a comment on 'Search pagination'", time: "1 hour ago", read: false },
    { id: 3, title: "Bug resolved", message: "Emma resolved 'Login validation error'", time: "2 hours ago", read: true },
  ];

  return (
    <div className="min-h-screen flex dark:bg-background">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Logo />
          </div>
          <nav className="mt-2 flex-1 px-2 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
            >
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors"
            >
              <FolderKanban className="mr-3 h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/bugs"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors"
            >
              <Bug className="mr-3 h-4 w-4" />
              Bugs
            </Link>
            <Link
              href="/team"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors"
            >
              <Users className="mr-3 h-4 w-4" />
              Team
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted transition-colors"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">View profile</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header and content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <button className="text-muted-foreground md:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div className="md:hidden ml-2">
                <Logo />
              </div>
            </div>
            <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-4">
              <div className="hidden md:block relative max-w-xs">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-1.5 text-sm bg-muted rounded-md border border-input focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between p-3 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button size="sm" variant="ghost" className="h-auto p-1">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-3 border-b last:border-0 hover:bg-muted/40 transition-colors ${notification.read ? '' : 'bg-muted/20'}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative mt-0.5">
                                {!notification.read && (
                                  <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-destructive"></span>
                                )}
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">BL</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{notification.title}</p>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full">View all notifications</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <ThemeToggle />
              <div className="border-l h-6 mx-2 hidden sm:block" />
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* Mobile footer navigation */}
        <div className="md:hidden border-t bg-background">
          <div className="flex h-16 items-center justify-around px-4">
            <Link href="/dashboard" className="flex flex-col items-center justify-center w-full">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/projects" className="flex flex-col items-center justify-center w-full">
              <FolderKanban className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs mt-1">Projects</span>
            </Link>
            <Link href="/bugs" className="flex flex-col items-center justify-center w-full">
              <Bug className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs mt-1">Bugs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 