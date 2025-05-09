"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Leaf,
  Droplet,
  Thermometer,
  Wind,
  BarChart,
  Download,
  Star,
  Clock,
  Filter,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">CloudFarm Hub</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Smart Farming Infrastructure as Code
                </h1>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                  당신의 농장에 꼭 맞는 스마트팜 구성 요소를<br></br>
                  찾아서, 배포하고, 손쉽게 관리하세요.
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
                        <SelectItem value="polyester">
                          폴리에스터 (Polyester)
                        </SelectItem>
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
                        <SelectItem value="industrial">
                          산업용 (Industrial)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">
                      온도 범위 (Temperature Range)
                    </Label>
                    <Select>
                      <SelectTrigger id="temperature">
                        <SelectValue placeholder="선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          저온 (Low: -10°C ~ 10°C)
                        </SelectItem>
                        <SelectItem value="medium">
                          중온 (Medium: 10°C ~ 25°C)
                        </SelectItem>
                        <SelectItem value="high">
                          고온 (High: 25°C ~ 40°C)
                        </SelectItem>
                        <SelectItem value="extreme">
                          극한 (Extreme: {">"}40°C)
                        </SelectItem>
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
                        <SelectItem value="dry">
                          건조 (Dry: {"<"} 30%)
                        </SelectItem>
                        <SelectItem value="normal">
                          보통 (Normal: 30% ~ 60%)
                        </SelectItem>
                        <SelectItem value="humid">
                          습함 (Humid: 60% ~ 80%)
                        </SelectItem>
                        <SelectItem value="very-humid">
                          매우 습함 (Very Humid: {">"} 80%)
                        </SelectItem>
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
                        <SelectItem value="iso">
                          ISO 인증 (ISO Certified)
                        </SelectItem>
                        <SelectItem value="organic">
                          유기농 인증 (Organic Certified)
                        </SelectItem>
                        <SelectItem value="eco">
                          친환경 인증 (Eco-Friendly)
                        </SelectItem>
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
                        <SelectItem value="low">
                          저전력 (Low: {"<"} 100W)
                        </SelectItem>
                        <SelectItem value="medium">
                          중전력 (Medium: 100W ~ 500W)
                        </SelectItem>
                        <SelectItem value="high">
                          고전력 (High: 500W ~ 1kW)
                        </SelectItem>
                        <SelectItem value="industrial">
                          산업용 (Industrial: {">"} 1kW)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                  type="button"
                  onClick={() => router.push("/resultpage")}
                >
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
                <h3 className="text-xl font-medium">검색 및 필터링</h3>
                <p className="text-muted-foreground">
                  다양한 조건으로 필터링하여 필요한 농업
                  <br></br> 인프라를 쉽게 찾을 수 있습니다
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium">간편한 업로드</h3>
                <p className="text-muted-foreground">
                  몇 번의 클릭만으로 자신만의 농업 인프라<br></br> 컴포넌트를
                  업로드할 수 있습니다
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium">스마트 농업</h3>
                <p className="text-muted-foreground">
                  최신 기술을 활용한 스마트 농업으로<br></br> 생산성과 효율성을
                  높이세요
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="w-full flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">CloudFarm Hub</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground mr-5">
            © 2025 CloudFarm Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
