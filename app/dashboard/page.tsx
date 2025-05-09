import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Droplet,
  Thermometer,
  BarChart,
  Settings,
  PlusCircle,
  Bell,
  User,
  Home,
  Package,
  History,
  HelpCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">SmartFarm Hub</span>
          </div>
        </div>
        <div className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-foreground transition-all"
            >
              <Package className="h-4 w-4" />
              <span>My Components</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            >
              <History className="h-4 w-4" />
              <span>Deployment History</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="relative max-w-sm ml-4 hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search components..." className="pl-8 w-[300px]" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">My Components</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Component
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">Temperature Sensor</CardTitle>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Active</Badge>
                  </div>
                  <CardDescription>High-precision temperature monitoring system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">Healthy</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">99.9%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deployed</p>
                      <p className="font-medium">2 weeks ago</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Version</p>
                      <p className="font-medium">v1.2.0</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">Smart Irrigation</CardTitle>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">Active</Badge>
                  </div>
                  <CardDescription>Automated precision irrigation system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">Healthy</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">98.7%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deployed</p>
                      <p className="font-medium">1 month ago</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Version</p>
                      <p className="font-medium">v2.0.1</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                        <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">Crop Analytics</CardTitle>
                    </div>
                    <Badge variant="outline">Inactive</Badge>
                  </div>
                  <CardDescription>AI-powered crop performance analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium">Offline</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">0%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deployed</p>
                      <p className="font-medium">Never</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Version</p>
                      <p className="font-medium">v1.0.0</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" size="sm">
                    Deploy
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="p-2 rounded-full bg-green-100 text-green-700">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Irrigation deployed successfully</h3>
                    <p className="text-sm text-muted-foreground">Version 2.0.1 was deployed to production</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                    <Thermometer className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Temperature Sensor updated</h3>
                    <p className="text-sm text-muted-foreground">Configuration changes applied to Temperature Sensor</p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Crop Analytics added to your components</h3>
                    <p className="text-sm text-muted-foreground">New component added to your account</p>
                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
