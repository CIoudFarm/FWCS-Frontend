"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ArrowRight, Copy, Check } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  // Sample JSON data based on form selections
  const jsonData = {
    name: "Advanced Temperature Sensor",
    type: "cotton",
    scale: "medium",
    temperature: "high",
    humidity: "normal",
    power: "low",
    description: "High-precision temperature monitoring system with real-time alerts and historical data tracking.",
  }

  // Format the full JSON data for display
  const formattedJson = JSON.stringify(jsonData, null, 2)

  // Create simplified JSON items for the left panel
  const jsonItems = Object.entries(jsonData).map(([key, value]) => {
    // Truncate long values
    const displayValue = typeof value === "string" && value.length > 30 ? value.substring(0, 30) + "..." : value

    return { key, value: displayValue }
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContinue = () => {
    router.push("/modifypage")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              SmartFarm Hub
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Dashboard</Button>
            <Button variant="outline">Sign In</Button>
            <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Component JSON Data</h1>
          <p className="text-muted-foreground">Review your component data before proceeding to the next step.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - JSON Items */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>JSON Properties</CardTitle>
                <CardDescription>Component properties in JSON format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0 max-h-[500px] overflow-y-auto pr-2">
                  {jsonItems.map(({ key, value }) => (
                    <div key={key} className="py-3 border-b last:border-0">
                      <div className="font-medium text-sm text-green-600">{key}:</div>
                      <div className="font-mono text-sm truncate mt-1">
                        {typeof value === "string" ? `"${value}"` : value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Full JSON and Next Steps */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Complete JSON</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </CardTitle>
                <CardDescription>Full component data in JSON format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted p-4 font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{formattedJson}</pre>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleContinue}>
                  Continue to Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Component Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        Your component data will be verified for compatibility with the SmartFarm Hub ecosystem
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Simulation</h4>
                      <p className="text-sm text-muted-foreground">
                        View an interactive simulation of your component in a smart farming environment
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Deployment</h4>
                      <p className="text-sm text-muted-foreground">
                        Deploy your component to the SmartFarm Hub marketplace
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background mt-12">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">SmartFarm Hub</span>
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
          <div className="text-sm text-muted-foreground">© 2025 SmartFarm Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
