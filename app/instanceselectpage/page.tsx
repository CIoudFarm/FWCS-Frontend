"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Leaf, Server, Cpu, Thermometer, Droplet, Wind, Sun, ArrowRight } from "lucide-react"

export default function IaaSPage() {
  const [instanceCount, setInstanceCount] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("instance")

  const handleNextClick = () => {
    setActiveTab("configuration")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">SmartFarm Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Pricing</Button>
            
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Server className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">스마트팜 인프라 서비스</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              클라우드 기반 스마트팜 인프라를 손쉽게 구축하고 관리하세요
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="instance">인스턴스 선택</TabsTrigger>
              <TabsTrigger value="configuration">구성 설정</TabsTrigger>
            </TabsList>

            <TabsContent value="instance" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* 기본형 인스턴스 */}
                <Card
                  className={`cursor-pointer transition-all ${selectedPlan === "basic" ? "border-green-500 shadow-lg" : "hover:border-green-200"}`}
                  onClick={() => setSelectedPlan("basic")}
                >
                  <CardHeader>
                    <CardTitle>기본형</CardTitle>
                    <CardDescription>소규모 스마트팜에 적합</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">
                      ₩50,000<span className="text-sm font-normal text-muted-foreground">/월</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-green-600" />
                        <span>온도 센서 5개</span>
                      </li>
                      <li className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-green-600" />
                        <span>습도 센서 5개</span>
                      </li>
                      <li className="flex items-center">
                        <Sun className="h-4 w-4 mr-2 text-green-600" />
                        <span>조도 센서 3개</span>
                      </li>
                      <li className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-green-600" />
                        <span>제어 시스템 1개</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">선택</Button>
                  </CardFooter>
                </Card>

                {/* 표준형 인스턴스 */}
                <Card
                  className={`cursor-pointer transition-all ${selectedPlan === "standard" ? "border-green-500 shadow-lg" : "hover:border-green-200"}`}
                  onClick={() => setSelectedPlan("standard")}
                >
                  <CardHeader>
                    <CardTitle>표준형</CardTitle>
                    <CardDescription>중규모 스마트팜에 적합</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">
                      ₩120,000<span className="text-sm font-normal text-muted-foreground">/월</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-green-600" />
                        <span>온도 센서 15개</span>
                      </li>
                      <li className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-green-600" />
                        <span>습도 센서 15개</span>
                      </li>
                      <li className="flex items-center">
                        <Sun className="h-4 w-4 mr-2 text-green-600" />
                        <span>조도 센서 10개</span>
                      </li>
                      <li className="flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-green-600" />
                        <span>환기 시스템 5개</span>
                      </li>
                      <li className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-green-600" />
                        <span>제어 시스템 3개</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">선택</Button>
                  </CardFooter>
                </Card>

                {/* 고급형 인스턴스 */}
                <Card
                  className={`cursor-pointer transition-all ${selectedPlan === "premium" ? "border-green-500 shadow-lg" : "hover:border-green-200"}`}
                  onClick={() => setSelectedPlan("premium")}
                >
                  <CardHeader>
                    <CardTitle>고급형</CardTitle>
                    <CardDescription>대규모 스마트팜에 적합</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">
                      ₩250,000<span className="text-sm font-normal text-muted-foreground">/월</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-green-600" />
                        <span>온도 센서 30개</span>
                      </li>
                      <li className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-green-600" />
                        <span>습도 센서 30개</span>
                      </li>
                      <li className="flex items-center">
                        <Sun className="h-4 w-4 mr-2 text-green-600" />
                        <span>조도 센서 20개</span>
                      </li>
                      <li className="flex items-center">
                        <Wind className="h-4 w-4 mr-2 text-green-600" />
                        <span>환기 시스템 10개</span>
                      </li>
                      <li className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-green-600" />
                        <span>제어 시스템 5개</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">선택</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label>인스턴스 수량</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[instanceCount]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => setInstanceCount(value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{instanceCount}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>배포 지역</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="지역 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seoul">서울</SelectItem>
                      <SelectItem value="busan">부산</SelectItem>
                      <SelectItem value="daegu">대구</SelectItem>
                      <SelectItem value="gwangju">광주</SelectItem>
                      <SelectItem value="jeju">제주</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-scaling" />
                  <Label htmlFor="auto-scaling">자동 확장 활성화</Label>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleNextClick}>
                  다음: 구성 설정
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="configuration">
              <Card>
                <CardHeader>
                  <CardTitle>구성 설정</CardTitle>
                  <CardDescription>스마트팜 인프라의 세부 설정을 구성하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instance-name">인스턴스 이름</Label>
                    <Input id="instance-name" placeholder="예: 토마토 스마트팜 01" />
                  </div>

                  <div className="space-y-2">
                    <Label>센서 설정</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="temp-range">온도 범위 설정 (°C)</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="temp-min" placeholder="최소" className="w-20" />
                          <span>~</span>
                          <Input id="temp-max" placeholder="최대" className="w-20" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="humidity-range">습도 범위 설정 (%)</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="humidity-min" placeholder="최소" className="w-20" />
                          <span>~</span>
                          <Input id="humidity-max" placeholder="최대" className="w-20" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>알림 설정</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-email" />
                        <Label htmlFor="alert-email">이메일 알림</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-sms" />
                        <Label htmlFor="alert-sms">SMS 알림</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="alert-app" />
                        <Label htmlFor="alert-app">앱 푸시 알림</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    인스턴스 생성
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="w-full flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2 ml-5">
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
          <div className="text-sm text-muted-foreground mr-5">© 2025 SmartFarm Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
