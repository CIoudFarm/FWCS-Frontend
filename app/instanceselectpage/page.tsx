"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Server,
  Cpu,
  Thermometer,
  Droplet,
  Wind,
  Sun,
  ArrowRight,
  Info,
  Search,
  Filter,
  Star,
  Download,
  ChevronRight,
  Shield,
  BarChart,
} from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

// 인터페이스 정의
interface Position {
  x: number
  y: number
  layer: number
}

interface Plant {
  type: string
  name: string
  minTemp: number
  maxTemp: number
  minHumidity: number
  maxHumidity: number
  positions: Position[]
  growthStage: number
}

interface Actuator {
  type: string
  x: number
  y: number
}

interface Hardware {
  layers: number
  beds_per_layer: number
  sensors: Actuator[]
  actuators: Actuator[]
}

interface Dimensions {
  width: string
  length: string
  height: string
}

interface SettingFile {
  name: string
  description: string
  hardware: Hardware
  dimensions: Dimensions
  plants: Plant[]
}

interface SystemData {
  id: string
  name: string
  creater: string
  scale: string
  hit_range: string
  electricity: string
  humid: string
  functions: any[]
  setting_file: SettingFile
  notes: string
  added_at: Date
  updated_at: Date
  download_count: number
  stars: number
  imageUrl?: string // 옵션: 이미지 URL
}

export default function InstanceSelectPage() {
  const router = useRouter()

  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("instance")

  // 인스턴스 선택 상태
  const [instanceCount, setInstanceCount] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [region, setRegion] = useState<string>("")
  const [autoScaling, setAutoScaling] = useState(false)

  // 시스템 선택 상태
  const [systems, setSystems] = useState<SystemData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSystem, setSelectedSystem] = useState<SystemData | null>(null)

  // 검색 및 필터링 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)
  const [selectedScale, setSelectedScale] = useState<string | null>(null)

  // instanceName 상태 추가
  const [instanceName, setInstanceName] = useState("")

  // API에서 시스템 데이터 가져오기
  useEffect(() => {
    const fetchSystems = async () => {
      try {
        // 실제 API 엔드포인트로 변경해야 합니다
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/containers`)
        setSystems(response.data)
      } catch (error) {
        console.error("시스템 데이터를 가져오는 중 오류 발생:", error)
        // 에러 발생 시 더미 데이터 사용
        setSystems([
          {
            id: "sys-001",
            name: "토마토 재배 시스템",
            creater: "농업기술연구소",
            scale: "medium",
            hit_range: "18°C-26°C",
            electricity: "220V/60Hz",
            humid: "60%-80%",
            functions: ["자동 급수", "온도 조절", "습도 조절"],
            setting_file: {
              name: "토마토 재배 시스템",
              description: "토마토 재배에 최적화된 스마트팜 시스템입니다. 온도, 습도, 조도를 자동으로 조절합니다.",
              hardware: {
                layers: 3,
                beds_per_layer: 4,
                sensors: [
                  { type: "temperature", x: 1, y: 1 },
                  { type: "humidity", x: 2, y: 2 },
                ],
                actuators: [
                  { type: "water_pump", x: 1, y: 3 },
                  { type: "fan", x: 3, y: 1 },
                ],
              },
              dimensions: {
                width: "2m",
                length: "3m",
                height: "2.5m",
              },
              plants: [
                {
                  type: "tomato",
                  name: "방울토마토",
                  minTemp: 18,
                  maxTemp: 26,
                  minHumidity: 60,
                  maxHumidity: 80,
                  positions: [
                    { x: 1, y: 1, layer: 1 },
                    { x: 2, y: 2, layer: 2 },
                  ],
                  growthStage: 3,
                },
              ],
            },
            notes: "토마토 재배에 최적화된 시스템입니다.",
            added_at: new Date("2025-01-15"),
            updated_at: new Date("2025-04-20"),
            download_count: 1250,
            stars: 4.7,
            imageUrl: "/tomato-farm-system.png",
          },
          {
            id: "sys-002",
            name: "딸기 재배 시스템",
            creater: "스마트팜 솔루션즈",
            scale: "small",
            hit_range: "15°C-22°C",
            electricity: "220V/60Hz",
            humid: "65%-85%",
            functions: ["자동 급수", "LED 조명", "환기 시스템"],
            setting_file: {
              name: "딸기 재배 시스템",
              description: "딸기 재배에 최적화된 소형 스마트팜 시스템입니다. 초보자도 쉽게 사용할 수 있습니다.",
              hardware: {
                layers: 2,
                beds_per_layer: 3,
                sensors: [
                  { type: "temperature", x: 1, y: 1 },
                  { type: "humidity", x: 2, y: 1 },
                ],
                actuators: [
                  { type: "water_pump", x: 1, y: 2 },
                  { type: "led_light", x: 2, y: 2 },
                ],
              },
              dimensions: {
                width: "1.5m",
                length: "2m",
                height: "1.8m",
              },
              plants: [
                {
                  type: "strawberry",
                  name: "설향딸기",
                  minTemp: 15,
                  maxTemp: 22,
                  minHumidity: 65,
                  maxHumidity: 85,
                  positions: [
                    { x: 1, y: 1, layer: 1 },
                    { x: 1, y: 2, layer: 1 },
                  ],
                  growthStage: 2,
                },
              ],
            },
            notes: "초보자에게 적합한 딸기 재배 시스템입니다.",
            added_at: new Date("2025-02-10"),
            updated_at: new Date("2025-05-05"),
            download_count: 980,
            stars: 4.5,
            imageUrl: "/strawberry-farm-system.png",
          },
          {
            id: "sys-003",
            name: "상추 수경재배 시스템",
            creater: "농업기술연구소",
            scale: "large",
            hit_range: "16°C-24°C",
            electricity: "220V/60Hz",
            humid: "55%-75%",
            functions: ["자동 급수", "영양분 공급", "pH 조절"],
            setting_file: {
              name: "상추 수경재배 시스템",
              description: "대규모 상추 수경재배를 위한 고급 시스템입니다. 영양분과 pH를 자동으로 조절합니다.",
              hardware: {
                layers: 4,
                beds_per_layer: 6,
                sensors: [
                  { type: "temperature", x: 1, y: 1 },
                  { type: "humidity", x: 2, y: 2 },
                  { type: "ph", x: 3, y: 3 },
                ],
                actuators: [
                  { type: "water_pump", x: 1, y: 4 },
                  { type: "nutrient_pump", x: 2, y: 4 },
                  { type: "ph_controller", x: 3, y: 4 },
                ],
              },
              dimensions: {
                width: "3m",
                length: "5m",
                height: "3m",
              },
              plants: [
                {
                  type: "lettuce",
                  name: "로메인 상추",
                  minTemp: 16,
                  maxTemp: 24,
                  minHumidity: 55,
                  maxHumidity: 75,
                  positions: [
                    { x: 1, y: 1, layer: 1 },
                    { x: 2, y: 2, layer: 2 },
                  ],
                  growthStage: 4,
                },
              ],
            },
            notes: "대규모 상추 재배에 적합한 시스템입니다.",
            added_at: new Date("2025-03-05"),
            updated_at: new Date("2025-05-10"),
            download_count: 1500,
            stars: 4.8,
            imageUrl: "/placeholder.svg?key=aeyfo",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSystems()
  }, [])

  // 필터링된 시스템 목록
  const filteredSystems = systems.filter((system) => {
    const matchesSearch =
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.setting_file.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCreator = !selectedCreator || system.creater === selectedCreator
    const matchesScale = !selectedScale || system.scale === selectedScale

    return matchesSearch && matchesCreator && matchesScale
  })

  // 제작자 목록
  const creators = [...new Set(systems.map((system) => system.creater))]

  // 규모 목록
  const scales = [...new Set(systems.map((system) => system.scale))]

  // 규모 표시 함수
  const getScaleLabel = (scale: string) => {
    const labels: Record<string, string> = {
      small: "소규모",
      medium: "중규모",
      large: "대규모",
      industrial: "산업용",
    }
    return labels[scale] || scale
  }

  // 등급 표시 함수
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    )
  }

  // 다음 단계로 이동 함수에서 인스턴스 이름 검증 추가
  const handleNext = async() => {
    if (activeTab === "instance") {
      if (!selectedPlan) {
        alert("인스턴스 유형을 선택해주세요.")
        return
      }
      if (!region) {
        alert("배포 지역을 선택해주세요.")
        return
      }
      if (!instanceName.trim()) {
        alert("인스턴스 이름을 입력해주세요.")
        return
      }
      setActiveTab("system")
    } else {
      if (!selectedSystem) {
        alert("시스템을 선택해주세요.")
        return
      }

      // 선택한 정보를 로컬 스토리지에 저장하거나 상태 관리 라이브러리를 통해 유지할 수 있습니다
      const formData = new FormData()
      formData.append("name", instanceName)
      formData.append("region", region)
      formData.append("type", selectedPlan)
      

      const jsonString = JSON.stringify(selectedSystem.setting_file)
      const file = new File([jsonString], "plant-data.json", { type: "application/json" })
      formData.append("base_config", file)
      console.log("📦 FormData 내용:")
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value)
}
      
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mypage/instances/`,formData,
        {headers: {
        "Content-Type": "multipart/form-data",
      }},
      )
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.error(err)})
      // 다음 페이지로 이동
      router.push("/mypage")
    }
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* 배경 요소들 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950/20 dark:via-background dark:to-blue-950/10"></div>

        {/* 왼쪽 상단 장식 */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-60"></div>

        {/* 오른쪽 하단 장식 */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>

        {/* 중앙 장식 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-green-50 dark:bg-green-900/10 blur-3xl opacity-40"></div>

        {/* 작은 아이콘 패턴 */}
        <div className="absolute top-1/4 left-1/5 opacity-10">
          <Thermometer className="h-12 w-12 text-red-600 dark:text-red-500" />
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-10">
          <Droplet className="h-10 w-10 text-blue-600 dark:text-blue-500" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-10">
          <Sun className="h-14 w-14 text-yellow-600 dark:text-yellow-500" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10">
          <Wind className="h-16 w-16 text-blue-600 dark:text-blue-500" />
        </div>

        {/* 격자 패턴 */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Link href="/" className="flex items-center gap-2">
              <BrandIcon className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">FWCS Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/mypage")}>
              마이페이지
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Server className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">스마트팜 설정</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              인스턴스와 시스템을 선택하여 스마트팜을 구성하세요
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="instance">인스턴스 선택</TabsTrigger>
                <TabsTrigger value="system">시스템 선택</TabsTrigger>
              </TabsList>

              {/* 인스턴스 선택 탭 */}
              <TabsContent value="instance" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 기본형 인스턴스 */}
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedPlan === "기본형" ? "border-green-500 shadow-lg" : "hover:border-green-200"
                    }`}
                    onClick={() => setSelectedPlan("기본형")}
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
                      <Button
                        className={`w-full ${
                          selectedPlan === "기본형"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                        onClick={() => setSelectedPlan("기본형")}
                      >
                        {selectedPlan === "기본형" ? "선택됨" : "선택"}
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* 표준형 인스턴스 */}
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedPlan === "표준형" ? "border-green-500 shadow-lg" : "hover:border-green-200"
                    }`}
                    onClick={() => setSelectedPlan("표준형")}
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
                      <Button
                        className={`w-full ${
                          selectedPlan === "표준형"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                        onClick={() => setSelectedPlan("표준형")}
                      >
                        {selectedPlan === "표준형" ? "선택됨" : "선택"}
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* 고급형 인스턴스 */}
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedPlan === "고급형" ? "border-green-500 shadow-lg" : "hover:border-green-200"
                    }`}
                    onClick={() => setSelectedPlan("고급형")}
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
                      <Button
                        className={`w-full ${
                          selectedPlan === "고급형"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                        onClick={() => setSelectedPlan("고급형")}
                      >
                        {selectedPlan === "고급형" ? "선택됨" : "선택"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm p-6 rounded-lg shadow-md space-y-6">
                  <div className="space-y-2">
                    <Label>인스턴스 이름</Label>
                    <Input
                      type="text"
                      placeholder="인스턴스 이름을 입력하세요"
                      value={instanceName}
                      onChange={(e) => setInstanceName(e.target.value)}
                    />
                  </div>

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
                    <Select value={region} onValueChange={setRegion}>
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
                    <Switch id="auto-scaling" checked={autoScaling} onCheckedChange={setAutoScaling} />
                    <Label htmlFor="auto-scaling">자동 확장 활성화</Label>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleNext}>
                        다음: 시스템 선택
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 시스템 선택 탭 */}
              <TabsContent value="system" className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">시스템 선택</h2>
                  <p className="text-muted-foreground">
                    스마트팜 인스턴스에 사용할 시스템을 선택하세요. 각 시스템은 특정 작물 재배에 최적화되어 있습니다.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* 필터 패널 */}
                  <div className="w-full md:w-64 shrink-0">
                    <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">필터</CardTitle>
                          <Button variant="ghost" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="시스템 검색..."
                              className="pl-8"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>제작자</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="all-creators"
                                  checked={selectedCreator === null}
                                  onCheckedChange={() => setSelectedCreator(null)}
                                />
                                <Label htmlFor="all-creators" className="text-sm font-normal">
                                  모든 제작자
                                </Label>
                              </div>
                              {creators.map((creator) => (
                                <div key={creator} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`creator-${creator}`}
                                    checked={selectedCreator === creator}
                                    onCheckedChange={() => setSelectedCreator(creator)}
                                  />
                                  <Label htmlFor={`creator-${creator}`} className="text-sm font-normal">
                                    {creator}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>규모</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="all-scales"
                                  checked={selectedScale === null}
                                  onCheckedChange={() => setSelectedScale(null)}
                                />
                                <Label htmlFor="all-scales" className="text-sm font-normal">
                                  모든 규모
                                </Label>
                              </div>
                              {scales.map((scale) => (
                                <div key={scale} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`scale-${scale}`}
                                    checked={selectedScale === scale}
                                    onCheckedChange={() => setSelectedScale(scale)}
                                  />
                                  <Label htmlFor={`scale-${scale}`} className="text-sm font-normal">
                                    {getScaleLabel(scale)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => {
                                setSearchQuery("")
                                setSelectedCreator(null)
                                setSelectedScale(null)
                              }}
                            >
                              필터 초기화
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 시스템 목록 및 상세 정보 */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* 시스템 목록 */}
                      <div className={`w-full ${selectedSystem ? "md:w-1/2" : ""}`}>
                        <div className="mb-4">
                          <h2 className="text-xl font-bold">사용 가능한 시스템 ({filteredSystems.length})</h2>
                          <p className="text-muted-foreground">원하는 시스템을 선택하세요</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {loading ? (
                            <div className="text-center py-8">데이터를 불러오는 중...</div>
                          ) : filteredSystems.length > 0 ? (
                            filteredSystems.map((system) => (
                              <Card
                                key={system.id}
                                className={`cursor-pointer transition-all hover:border-green-500 shadow-sm hover:shadow-md ${
                                  selectedSystem?.id === system.id
                                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                                    : ""
                                }`}
                                onClick={() => setSelectedSystem(system)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-md bg-muted shrink-0 overflow-hidden shadow-sm relative">
                                      <div
                                        className="w-full h-full"
                                        style={{
                                          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}/photos/${system.id}/)`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                        }}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h3 className="font-medium truncate">{system.name}</h3>
                                          <p className="text-sm text-muted-foreground">{system.creater}</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                      </div>
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        <Badge variant="secondary" className="text-xs">
                                          {system.creater}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                          {getScaleLabel(system.scale)}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                          {system.hit_range}
                                        </Badge>
                                      </div>
                                      <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Download className="h-3 w-3 mr-1" />
                                          {system.download_count}
                                        </div>
                                        <div className="flex items-center">{renderRating(system.stars)}</div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                              <Info className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
                              <p className="text-muted-foreground mb-4">검색어나 필터를 변경해 보세요.</p>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSearchQuery("")
                                  setSelectedCreator(null)
                                  setSelectedScale(null)
                                }}
                              >
                                필터 초기화
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 시스템 상세 정보 */}
                      {selectedSystem && (
                        <div className="w-full md:w-1/2">
                          <Card className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm shadow-lg">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{selectedSystem.name}</CardTitle>
                                  <CardDescription>by {selectedSystem.creater}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                  {renderRating(selectedSystem.stars)}
                                  <Badge variant="outline" className="ml-2">
                                    <Download className="h-3 w-3 mr-1" />
                                    {selectedSystem.download_count}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/3 h-48 rounded-md bg-muted overflow-hidden shadow-md relative">
                                  <div
                                    className="w-full h-full"
                                    style={{
                                      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}/photos/${selectedSystem.id}/)`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                  />
                                </div>
                                <div className="w-full md:w-2/3">
                                  <h3 className="text-lg font-medium mb-2">설명</h3>
                                  <p className="text-muted-foreground mb-4">
                                    {selectedSystem.setting_file.description}
                                  </p>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">제작자</h4>
                                      <p className="text-sm">{selectedSystem.creater}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">규모</h4>
                                      <p className="text-sm">{getScaleLabel(selectedSystem.scale)}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">온도 범위</h4>
                                      <p className="text-sm">{selectedSystem.hit_range}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">습도 범위</h4>
                                      <p className="text-sm">{selectedSystem.humid}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">전력 소비</h4>
                                      <p className="text-sm">{selectedSystem.electricity}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">최종 업데이트</h4>
                                      <p className="text-sm">
                                        {new Date(selectedSystem.updated_at).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Tabs defaultValue="features">
                                <TabsList className="w-full">
                                  <TabsTrigger value="features" className="flex-1">
                                    <BarChart className="h-4 w-4 mr-2" />
                                    기능
                                  </TabsTrigger>
                                  <TabsTrigger value="compatibility" className="flex-1">
                                    <Server className="h-4 w-4 mr-2" />
                                    호환성
                                  </TabsTrigger>
                                  <TabsTrigger value="specs" className="flex-1">
                                    <Shield className="h-4 w-4 mr-2" />
                                    사양 및 인증
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent value="features" className="pt-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {selectedSystem.functions && selectedSystem.functions.length > 0 ? (
                                      selectedSystem.functions.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-green-500" />
                                          <span>{feature}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="col-span-2 text-center py-4 text-muted-foreground">
                                        등록된 기능 정보가 없습니다.
                                      </div>
                                    )}
                                  </div>
                                </TabsContent>
                                <TabsContent value="compatibility" className="pt-4">
                                  <h3 className="text-sm font-medium mb-2">호환 작물</h3>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedSystem.setting_file.plants.map((plant, index) => (
                                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                                        {plant.name}
                                      </Badge>
                                    ))}
                                  </div>

                                  <h3 className="text-sm font-medium mt-4 mb-2">추천 조합</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {systems
                                      .filter((s) => s.id !== selectedSystem.id)
                                      .slice(0, 3)
                                      .map((system) => (
                                        <Card
                                          key={system.id}
                                          className="cursor-pointer hover:border-green-500 bg-white/70 dark:bg-gray-950/70"
                                          onClick={() => setSelectedSystem(system)}
                                        >
                                          <CardContent className="p-3">
                                            <div className="text-sm font-medium truncate">{system.name}</div>
                                            <div className="text-xs text-muted-foreground">{system.creater}</div>
                                            <div className="mt-1">{renderRating(system.stars)}</div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                  </div>
                                </TabsContent>
                                <TabsContent value="specs" className="pt-4">
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">하드웨어 사양</h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">레이어 수:</span>
                                          <span>{selectedSystem.setting_file.hardware.layers}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">레이어당 베드:</span>
                                          <span>{selectedSystem.setting_file.hardware.beds_per_layer}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">센서 수:</span>
                                          <span>{selectedSystem.setting_file.hardware.sensors.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">액추에이터 수:</span>
                                          <span>{selectedSystem.setting_file.hardware.actuators.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">너비:</span>
                                          <span>{selectedSystem.setting_file.dimensions.width}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">길이:</span>
                                          <span>{selectedSystem.setting_file.dimensions.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">높이:</span>
                                          <span>{selectedSystem.setting_file.dimensions.height}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="text-sm font-medium mb-2">시스템 요구사항</h3>
                                      <div className="text-sm space-y-1">
                                        <p>• FWCS Hub 플랫폼 v2.0 이상</p>
                                        <p>• 인터넷 연결 (최소 1Mbps)</p>
                                        <p>• 호환 가능한 전원 공급 장치 ({selectedSystem.electricity})</p>
                                        <p>• 최소 100MB 저장 공간</p>
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                              <Button className="bg-green-600 hover:bg-green-700" onClick={handleNext}>
                                이 시스템으로 인스턴스 생성
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </div>

                    {!selectedSystem && !loading && filteredSystems.length > 0 && (
                      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg mt-6">
                        <Server className="h-16 w-16 text-muted-foreground mb-6" />
                        <h3 className="text-xl font-medium mb-2">시스템을 선택해주세요</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          왼쪽 목록에서 원하는 스마트팜 시스템을 선택하면 상세 정보를 확인할 수 있습니다.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setActiveTab("instance")}>
                        이전: 인스턴스 선택
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleNext}
                        disabled={!selectedSystem}
                      >
                        인스턴스 생성
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="w-full flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2 ml-5">
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
          <div className="text-sm text-muted-foreground mr-5">© 2025 FWCS Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
