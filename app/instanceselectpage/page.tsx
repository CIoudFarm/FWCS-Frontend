"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
  Leaf,
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
import { useRouter } from "next/navigation"

// 시스템 타입 정의
interface SystemItem {
  id: number
  name: string
  creator: string
  type: string
  scale: string
  temperature: string
  humidity: string
  power: string
  rating: number
  downloads: number
  lastUpdated: string
  description: string
  features: string[]
  compatibility: string[]
  certifications: string[]
  imageUrl: string
}

export default function IaaSPage() {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("instance")

  // 인스턴스 선택 상태
  const [instanceCount, setInstanceCount] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [region, setRegion] = useState<string>("")
  const [autoScaling, setAutoScaling] = useState(false)

  // 검색 및 필터링 상태
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedScale, setSelectedScale] = useState<string | null>(null)

  // 시스템 선택 상태
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null)

  // 시스템 데이터
  const systemItems: SystemItem[] = [
    {
      id: 1,
      name: "Smart Irrigation Controller",
      creator: "AquaTech Solutions",
      type: "irrigation",
      scale: "medium",
      temperature: "normal",
      humidity: "normal",
      power: "medium",
      rating: 4.5,
      downloads: 2345,
      lastUpdated: "2025-04-12",
      description:
        "Advanced irrigation controller that optimizes water usage based on soil moisture, weather forecasts, and plant needs. Reduces water consumption by up to 40%.",
      features: [
        "스마트 물 관리",
        "토양 수분 모니터링",
        "날씨 기반 일정 조정",
        "구역별 제어",
        "물 사용량 보고서",
        "모바일 앱 제어",
      ],
      compatibility: ["field_crops", "orchards", "greenhouse"],
      certifications: ["WaterSense", "ISO 14001"],
      imageUrl: "/agricultural-irrigation.png",
    },
    {
      id: 2,
      name: "Precision Seeding System",
      creator: "FarmTech Innovations",
      type: "planting",
      scale: "large",
      temperature: "normal",
      humidity: "normal",
      power: "high",
      rating: 4.7,
      downloads: 1876,
      lastUpdated: "2025-03-28",
      description:
        "High-precision seeding system that ensures optimal seed placement, spacing, and depth. Increases germination rates and crop uniformity.",
      features: ["정밀 종자 배치", "가변 속도 제어", "자동 깊이 조정", "종자 모니터링", "GPS 매핑", "데이터 로깅"],
      compatibility: ["row_crops", "vegetables", "small_grains"],
      certifications: ["ISO 9001", "CE"],
      imageUrl: "/precision-seeding.png",
    },
    {
      id: 3,
      name: "Automated Harvesting Robot",
      creator: "RoboFarm Systems",
      type: "harvesting",
      scale: "large",
      temperature: "normal",
      humidity: "normal",
      power: "high",
      rating: 4.6,
      downloads: 1243,
      lastUpdated: "2025-02-15",
      description:
        "Autonomous harvesting robot that uses computer vision and AI to identify and harvest crops at optimal ripeness. Reduces labor costs and increases harvest efficiency.",
      features: ["AI 작물 인식", "정밀 수확", "자율 주행", "수확량 추적", "품질 분류", "24/7 작동"],
      compatibility: ["fruits", "vegetables", "specialty_crops"],
      certifications: ["ISO 9001", "CE", "UL"],
      imageUrl: "/futuristic-harvesting-robot.png",
    },
    {
      id: 4,
      name: "Soil Health Monitoring System",
      creator: "TerraSense Technologies",
      type: "monitoring",
      scale: "small",
      temperature: "normal",
      humidity: "normal",
      power: "low",
      rating: 4.8,
      downloads: 3210,
      lastUpdated: "2025-04-05",
      description:
        "Comprehensive soil monitoring system that tracks nutrients, pH, moisture, and microbial activity. Provides actionable insights for soil management.",
      features: [
        "실시간 토양 분석",
        "영양소 매핑",
        "pH 모니터링",
        "미생물 활동 추적",
        "토양 건강 점수",
        "개선 권장사항",
      ],
      compatibility: ["all_crops", "research", "precision_agriculture"],
      certifications: ["ISO 14001", "USDA Approved"],
      imageUrl: "/soil-monitoring.png",
    },
    {
      id: 5,
      name: "Drone Crop Monitoring",
      creator: "SkyView Agricultural",
      type: "monitoring",
      scale: "medium",
      temperature: "normal",
      humidity: "normal",
      power: "medium",
      rating: 4.4,
      downloads: 1987,
      lastUpdated: "2025-03-10",
      description:
        "Drone-based crop monitoring system that captures multispectral imagery to assess crop health, detect pests, and identify irrigation issues.",
      features: [
        "다중 스펙트럼 이미징",
        "작물 건강 지수",
        "해충 및 질병 감지",
        "자동 비행 경로",
        "데이터 분석 대시보드",
        "처방 맵 생성",
      ],
      compatibility: ["field_crops", "orchards", "vineyards"],
      certifications: ["FAA Compliant", "ISO 9001"],
      imageUrl: "/agricultural-drone.png",
    },
    {
      id: 6,
      name: "Climate Control System",
      creator: "ClimaTech Agricultural",
      type: "environmental",
      scale: "large",
      temperature: "extreme",
      humidity: "very-humid",
      power: "high",
      rating: 4.8,
      downloads: 1023,
      lastUpdated: "2025-03-05",
      description:
        "Comprehensive climate control system for greenhouses and indoor farms. Manages temperature, humidity, CO2 levels, and air circulation for optimal growing conditions.",
      features: [
        "통합 기후 제어",
        "온도 및 습도 관리",
        "CO2 수준 조절",
        "공기 순환 최적화",
        "에너지 효율 알고리즘",
        "원격 제어 및 모니터링",
      ],
      compatibility: ["greenhouse", "vertical_farm", "indoor_garden"],
      certifications: ["ISO 9001", "CE", "Energy Star"],
      imageUrl: "/greenhouse-climate-control.png",
    },
    {
      id: 7,
      name: "Livestock Monitoring System",
      creator: "AnimalTech Solutions",
      type: "livestock",
      scale: "medium",
      temperature: "normal",
      humidity: "normal",
      power: "medium",
      rating: 4.6,
      downloads: 1456,
      lastUpdated: "2025-02-20",
      description:
        "IoT-based livestock monitoring system that tracks animal health, behavior, and location. Provides early detection of health issues and optimizes herd management.",
      features: ["건강 모니터링", "행동 분석", "위치 추적", "자동 급이 통합", "번식 관리", "질병 조기 경보"],
      compatibility: ["cattle", "dairy", "swine", "poultry"],
      certifications: ["ISO 9001", "Animal Welfare Approved"],
      imageUrl: "/livestock-monitoring.png",
    },
    {
      id: 8,
      name: "Automated Nutrient Delivery",
      creator: "NutriGrow Systems",
      type: "fertilization",
      scale: "medium",
      temperature: "normal",
      humidity: "normal",
      power: "medium",
      rating: 4.7,
      downloads: 1789,
      lastUpdated: "2025-04-01",
      description:
        "Precision nutrient delivery system that automatically adjusts fertilizer application based on crop needs, soil conditions, and growth stage.",
      features: ["정밀 영양소 투여", "실시간 조정", "작물별 레시피", "영양소 사용 효율화", "폐기물 감소", "원격 관리"],
      compatibility: ["hydroponic", "greenhouse", "precision_agriculture"],
      certifications: ["ISO 14001", "Organic Certified"],
      imageUrl: "/nutrient-delivery-system.png",
    },
  ]

  // 필터링된 시스템 목록
  const filteredSystems = systemItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || item.type === selectedType
    const matchesScale = !selectedScale || item.scale === selectedScale

    return matchesSearch && matchesType && matchesScale
  })

  // 시스템 유형 목록
  const systemTypes = [...new Set(systemItems.map((item) => item.type))]

  // 규모 목록
  const scaleOptions = [...new Set(systemItems.map((item) => item.scale))]

  // 호환성 표시 함수
  const getCompatibilityLabel = (compatibility: string) => {
    const labels: Record<string, string> = {
      field_crops: "밭작물",
      orchards: "과수원",
      greenhouse: "온실",
      row_crops: "줄작물",
      vegetables: "채소",
      small_grains: "소립종",
      fruits: "과일",
      specialty_crops: "특용작물",
      all_crops: "모든 작물",
      research: "연구용",
      precision_agriculture: "정밀농업",
      vineyards: "포도원",
      vertical_farm: "수직농장",
      indoor_garden: "실내정원",
      cattle: "소",
      dairy: "낙농",
      swine: "돼지",
      poultry: "가금류",
      hydroponic: "수경재배",
    }

    return labels[compatibility] || compatibility
  }

  // 규모 표시 함수
  const getScaleLabel = (scale: string) => {
    const labels: Record<string, string> = {
      small: "소규모",
      medium: "중규모",
      large: "대규모",
    }

    return labels[scale] || scale
  }

  // 유형 표시 함수
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      irrigation: "관개",
      planting: "파종",
      harvesting: "수확",
      monitoring: "모니터링",
      environmental: "환경제어",
      livestock: "축산",
      fertilization: "시비",
    }

    return labels[type] || type
  }

  // 시스템 선택 처리
  const handleSystemSelect = (system: SystemItem) => {
    setSelectedSystem(system)
  }

  // 인스턴스 생성 처리
  const handleCreateInstance = () => {
    if (activeTab === "instance" && !selectedPlan) {
      alert("인스턴스 유형을 선택해주세요.")
      return
    }

    if (activeTab === "configuration" && !selectedSystem) {
      alert("시스템을 선택해주세요.")
      return
    }

    alert("인스턴스 생성 요청이 전송되었습니다.")
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

  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">FWCS Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button variant="outline">
              이전
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/mypage")}>마이페이지</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Server className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">스마트팜 인프라 서비스</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              클라우드 기반 스마트팜 인프라를 손쉽게 구축하고 관리하세요
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="instance">인스턴스 선택</TabsTrigger>
                <TabsTrigger value="configuration">구성 설정</TabsTrigger>
              </TabsList>

              {/* 인스턴스 선택 탭 */}
              <TabsContent value="instance" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 기본형 인스턴스 */}
                  <Card
                    className={`cursor-pointer transition-all ${selectedPlan === "basic" ? "border-green-500 shadow-lg" : "hover:border-green-200"
                      }`}
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
                      <Button
                        className={`w-full ${selectedPlan === "basic"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        onClick={() => setSelectedPlan("basic")}
                      >
                        {selectedPlan === "basic" ? "선택됨" : "선택"}
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* 표준형 인스턴스 */}
                  <Card
                    className={`cursor-pointer transition-all ${selectedPlan === "standard" ? "border-green-500 shadow-lg" : "hover:border-green-200"
                      }`}
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
                      <Button
                        className={`w-full ${selectedPlan === "standard"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        onClick={() => setSelectedPlan("standard")}
                      >
                        {selectedPlan === "standard" ? "선택됨" : "선택"}
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* 고급형 인스턴스 */}
                  <Card
                    className={`cursor-pointer transition-all ${selectedPlan === "premium" ? "border-green-500 shadow-lg" : "hover:border-green-200"
                      }`}
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
                      <Button
                        className={`w-full ${selectedPlan === "premium"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        onClick={() => setSelectedPlan("premium")}
                      >
                        {selectedPlan === "premium" ? "선택됨" : "선택"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
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

                  <div className="flex justify-end mt-4">
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("configuration")}>
                      다음: 구성 설정
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* 구성 설정 탭 */}
              <TabsContent value="configuration" className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">시스템 구성 설정</h2>
                  <p className="text-muted-foreground">
                    스마트팜 인스턴스에 사용할 시스템을 선택하고 구성하세요. 이 설정은 인스턴스 생성 후에도 변경할 수
                    있습니다.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* 필터 패널 */}
                  <div className="w-full md:w-64 shrink-0">
                    <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">필터</CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
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
                            <Label>시스템 유형</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="all-types"
                                  checked={selectedType === null}
                                  onCheckedChange={() => setSelectedType(null)}
                                />
                                <Label htmlFor="all-types" className="text-sm font-normal">
                                  모든 유형
                                </Label>
                              </div>
                              {systemTypes.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`type-${type}`}
                                    checked={selectedType === type}
                                    onCheckedChange={() => setSelectedType(type)}
                                  />
                                  <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                                    {getTypeLabel(type)}
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
                              {scaleOptions.map((scale) => (
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

                          <div className="space-y-2">
                            <Label>평점</Label>
                            <div className="pt-2">
                              <Slider defaultValue={[4]} min={1} max={5} step={0.1} />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => {
                                setSearchQuery("")
                                setSelectedType(null)
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
                          {filteredSystems.map((system) => (
                            <Card
                              key={system.id}
                              className={`cursor-pointer transition-all hover:border-green-500 shadow-sm hover:shadow-md ${selectedSystem?.id === system.id
                                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                                  : ""
                                }`}
                              onClick={() => handleSystemSelect(system)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-16 h-16 rounded-md bg-muted shrink-0 overflow-hidden shadow-sm relative">
                                    <Image
                                      src={system.imageUrl || "/placeholder.svg"}
                                      alt={system.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="font-medium truncate">{system.name}</h3>
                                        <p className="text-sm text-muted-foreground">{system.creator}</p>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      <Badge variant="secondary" className="text-xs">
                                        {getTypeLabel(system.type)}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {getScaleLabel(system.scale)}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {system.temperature}
                                      </Badge>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Download className="h-3 w-3 mr-1" />
                                        {system.downloads}
                                      </div>
                                      <div className="flex items-center">{renderRating(system.rating)}</div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          {filteredSystems.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                              <Info className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
                              <p className="text-muted-foreground mb-4">검색어나 필터를 변경해 보세요.</p>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSearchQuery("")
                                  setSelectedType(null)
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
                                  <CardDescription>by {selectedSystem.creator}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                  {renderRating(selectedSystem.rating)}
                                  <Badge variant="outline" className="ml-2">
                                    <Download className="h-3 w-3 mr-1" />
                                    {selectedSystem.downloads}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/3 h-48 rounded-md bg-muted overflow-hidden shadow-md relative">
                                  <Image
                                    src={selectedSystem.imageUrl || "/placeholder.svg"}
                                    alt={selectedSystem.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="w-full md:w-2/3">
                                  <h3 className="text-lg font-medium mb-2">설명</h3>
                                  <p className="text-muted-foreground mb-4">{selectedSystem.description}</p>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">시스템 유형</h4>
                                      <p className="text-sm">{getTypeLabel(selectedSystem.type)}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">규모</h4>
                                      <p className="text-sm">{getScaleLabel(selectedSystem.scale)}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">온도 범위</h4>
                                      <p className="text-sm">{selectedSystem.temperature}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">습도 범위</h4>
                                      <p className="text-sm">{selectedSystem.humidity}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">전력 소비</h4>
                                      <p className="text-sm">{selectedSystem.power}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">최종 업데이트</h4>
                                      <p className="text-sm">{selectedSystem.lastUpdated}</p>
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
                                    {selectedSystem.features.map((feature, index) => (
                                      <div key={index} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span>{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </TabsContent>
                                <TabsContent value="compatibility" className="pt-4">
                                  <h3 className="text-sm font-medium mb-2">호환 환경</h3>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedSystem.compatibility.map((comp) => (
                                      <Badge key={comp} variant="outline" className="mr-1 mb-1">
                                        {getCompatibilityLabel(comp)}
                                      </Badge>
                                    ))}
                                  </div>

                                  <h3 className="text-sm font-medium mt-4 mb-2">추천 조합</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {systemItems
                                      .filter((c) => c.id !== selectedSystem.id)
                                      .slice(0, 3)
                                      .map((system) => (
                                        <Card
                                          key={system.id}
                                          className="cursor-pointer hover:border-green-500 bg-white/70 dark:bg-gray-950/70"
                                          onClick={() => handleSystemSelect(system)}
                                        >
                                          <CardContent className="p-3">
                                            <div className="text-sm font-medium truncate">{system.name}</div>
                                            <div className="text-xs text-muted-foreground">{system.creator}</div>
                                            <div className="mt-1">{renderRating(system.rating)}</div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                  </div>
                                </TabsContent>
                                <TabsContent value="specs" className="pt-4">
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">인증</h3>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedSystem.certifications.map((cert) => (
                                          <Badge key={cert} variant="outline">
                                            {cert}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="text-sm font-medium mb-2">기술 사양</h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">센서 정확도:</span>
                                          <span>±0.1°C</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">응답 시간:</span>
                                          <span>{"<"} 1초</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">데이터 전송:</span>
                                          <span>Wi-Fi, Bluetooth, LoRa</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">배터리 수명:</span>
                                          <span>최대 5년</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">작동 온도:</span>
                                          <span>-30°C ~ 80°C</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">방수 등급:</span>
                                          <span>IP67</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="text-sm font-medium mb-2">시스템 요구사항</h3>
                                      <div className="text-sm space-y-1">
                                        <p>• SmartFarm Hub 플랫폼 v2.0 이상</p>
                                        <p>• 인터넷 연결 (최소 1Mbps)</p>
                                        <p>• 호환 가능한 전원 공급 장치 (12V DC)</p>
                                        <p>• 최소 100MB 저장 공간</p>
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                              <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateInstance}>
                                이 시스템으로 인스턴스 생성
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setActiveTab("instance")}>
                        이전: 인스턴스 선택
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleCreateInstance}
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
