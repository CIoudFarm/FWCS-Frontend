import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Leaf, Droplet, Thermometer, Wind, BarChart, Download, Star, Clock, Filter, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrandIcon } from "@/components/ui/brand-icon"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandIcon className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FWCS Hub</span>
          </div>

          <div className="relative w-full max-w-sm px-4">
            <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search infrastructure components..."
              className="w-full pl-10 rounded-full bg-muted"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="outline">Sign In</Button>
            <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Smart Farming Infrastructure as a Service
                </h1>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                  Find, deploy, and manage the perfect smart farming components for your needs
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-950 rounded-xl shadow-lg border p-6 mb-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fabric-type">직물 종류 (Fabric Type)</Label>
                    <Select>
                      <SelectTrigger id="fabric-type">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cotton">면직물 (Cotton)</SelectItem>
                        <SelectItem value="polyester">폴리에스터 (Polyester)</SelectItem>
                        <SelectItem value="nylon">나일론 (Nylon)</SelectItem>
                        <SelectItem value="wool">양모 (Wool)</SelectItem>
                        <SelectItem value="silk">실크 (Silk)</SelectItem>
                        <SelectItem value="hemp">대마 (Hemp)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scale">규모 (Scale)</Label>
                    <Select>
                      <SelectTrigger id="scale">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">소규모 (Small)</SelectItem>
                        <SelectItem value="medium">중규모 (Medium)</SelectItem>
                        <SelectItem value="large">대규모 (Large)</SelectItem>
                        <SelectItem value="industrial">산업용 (Industrial)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">온도 범위 (Temperature Range)</Label>
                    <Select>
                      <SelectTrigger id="temperature">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">저온 (Low: -10°C ~ 10°C)</SelectItem>
                        <SelectItem value="medium">중온 (Medium: 10°C ~ 25°C)</SelectItem>
                        <SelectItem value="high">고온 (High: 25°C ~ 40°C)</SelectItem>
                        <SelectItem value="extreme">극한 (Extreme: {">"}40°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">습도 범위 (Humidity Range)</Label>
                    <Select>
                      <SelectTrigger id="humidity">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dry">건조 (Dry: {"<"} 30%)</SelectItem>
                        <SelectItem value="normal">보통 (Normal: 30% ~ 60%)</SelectItem>
                        <SelectItem value="humid">습함 (Humid: 60% ~ 80%)</SelectItem>
                        <SelectItem value="very-humid">매우 습함 (Very Humid: {">"} 80%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certification">인증 (Certification)</Label>
                    <Select>
                      <SelectTrigger id="certification">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">없음 (None)</SelectItem>
                        <SelectItem value="iso">ISO 인증 (ISO Certified)</SelectItem>
                        <SelectItem value="organic">유기농 인증 (Organic Certified)</SelectItem>
                        <SelectItem value="eco">친환경 인증 (Eco-Friendly)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power">전력 소비 (Power Consumption)</Label>
                    <Select>
                      <SelectTrigger id="power">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">저전력 (Low: {"<"} 100W)</SelectItem>
                        <SelectItem value="medium">중전력 (Medium: 100W ~ 500W)</SelectItem>
                        <SelectItem value="high">고전력 (High: 500W ~ 1kW)</SelectItem>
                        <SelectItem value="industrial">산업용 (Industrial: {">"} 1kW)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    자동화 (Automated)
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    IoT 지원 (IoT Enabled)
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    AI 분석 (AI Analytics)
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  검색하기 (Search Components)
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium">Find Components</h3>
                <p className="text-muted-foreground">
                  Search our extensive library of smart farming infrastructure components
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium">Deploy Instantly</h3>
                <p className="text-muted-foreground">One-click deployment to your smart farming infrastructure</p>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium">Monitor & Manage</h3>
                <p className="text-muted-foreground">Real-time monitoring and management of your deployed components</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Popular Components</h2>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Latest
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full grid-cols-5 md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sensors">Sensors</TabsTrigger>
              <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
              <TabsTrigger value="climate">Climate Control</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sensor Component Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-lg">Temperature Sensor</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Verified
                      </Badge>
                    </div>
                    <CardDescription>High-precision temperature monitoring system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Real-time temperature monitoring with alerts and historical data tracking. Compatible with all
                      major smart farming platforms.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground">(128)</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">5.2k</span> deployments
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </CardFooter>
                </Card>

                {/* Irrigation Component Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-lg">Smart Irrigation</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Verified
                      </Badge>
                    </div>
                    <CardDescription>Automated precision irrigation system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      AI-powered irrigation that optimizes water usage based on soil moisture, weather forecasts, and
                      crop needs.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">4.9</span>
                      <span className="text-sm text-muted-foreground">(256)</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">8.7k</span> deployments
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </CardFooter>
                </Card>

                {/* Climate Control Component Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          <Wind className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-lg">Climate Controller</CardTitle>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                    <CardDescription>Greenhouse climate management system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete climate control for greenhouses, including temperature, humidity, CO2 levels, and
                      ventilation.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">4.7</span>
                      <span className="text-sm text-muted-foreground">(92)</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">3.4k</span> deployments
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sensors" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sensor-specific components would go here */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-lg">Temperature Sensor</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Verified
                      </Badge>
                    </div>
                    <CardDescription>High-precision temperature monitoring system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Real-time temperature monitoring with alerts and historical data tracking. Compatible with all
                      major smart farming platforms.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground">(128)</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">5.2k</span> deployments
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            {/* Other tab contents would be similar */}
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-2">
              View All Components
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to transform your farming?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of farmers who are already using our platform to increase yields, reduce costs, and
                  farm more sustainably.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-green-600 hover:bg-green-700">Get Started for Free</Button>
                <Button variant="outline">Schedule a Demo</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <BrandIcon className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FWCS Hub</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Documentation
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Blog
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">© 2025 FWCS Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
