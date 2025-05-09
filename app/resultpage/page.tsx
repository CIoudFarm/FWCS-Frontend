"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Leaf,
  Search,
  Filter,
  Star,
  Download,
  Server,
  ChevronRight,
  ArrowRight,
  X,
  BarChart,
  Shield,
  TreesIcon as Plant,
  Droplet,
  Thermometer,
  Wind,
  Sun,
} from "lucide-react"

// 호환성 타입을 정의합니다
type CompatibilityType =
  | "greenhouse"
  | "vertical_farm"
  | "hydroponic_system"
  | "field_crops"
  | "orchard"
  | "indoor_garden"
  | "dairy_farm"
  | "cattle_ranch"
  | "poultry_farm"
  | "reforestation"

// 컨테이너 타입을 정의합니다
interface Container {
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
  compatibility: CompatibilityType[]
  certifications: string[]
  imageUrl: string
}

// 샘플 컨테이너 데이터의 타입을 Container[]로 변경합니다
const containers: Container[] = [
  {
    id: 1,
    name: "Advanced Temperature Sensor",
    creator: "SmartFarm Inc.",
    type: "cotton",
    scale: "medium",
    temperature: "high",
    humidity: "normal",
    power: "low",
    rating: 4.8,
    downloads: 1245,
    lastUpdated: "2025-03-15",
    description:
      "High-precision temperature monitoring system with real-time alerts and historical data tracking. Ideal for greenhouse environments and sensitive crops.",
    features: [
      "±0.1°C 정확도",
      "실시간 알림 기능",
      "데이터 기록 및 분석",
      "저전력 설계",
      "무선 연결 지원",
      "방수 케이스 포함",
    ],
    compatibility: ["greenhouse", "vertical_farm", "hydroponic_system"],
    certifications: ["ISO 9001", "CE", "RoHS"],
    imageUrl: "/temperature-sensor.png",
  },
  {
    id: 2,
    name: "Smart Irrigation Controller",
    creator: "AquaTech Solutions",
    type: "polyester",
    scale: "large",
    temperature: "medium",
    humidity: "high",
    power: "medium",
    rating: 4.6,
    downloads: 987,
    lastUpdated: "2025-04-02",
    description:
      "AI-powered irrigation system that optimizes water usage based on soil moisture, weather forecasts, and plant needs. Reduces water consumption by up to 40%.",
    features: [
      "AI 기반 급수 최적화",
      "토양 수분 모니터링",
      "날씨 예보 통합",
      "물 사용량 분석",
      "모바일 앱 제어",
      "다중 구역 지원",
    ],
    compatibility: ["field_crops", "orchard", "greenhouse"],
    certifications: ["WaterSense", "ISO 14001"],
    imageUrl: "/placeholder.svg?key=p0t2v",
  },
  {
    id: 3,
    name: "Crop Health Monitor",
    creator: "GreenVision Technologies",
    type: "nylon",
    scale: "small",
    temperature: "medium",
    humidity: "normal",
    power: "low",
    rating: 4.9,
    downloads: 1567,
    lastUpdated: "2025-03-28",
    description:
      "Advanced imaging system that detects early signs of plant diseases, nutrient deficiencies, and pest infestations. Uses spectral analysis and machine learning.",
    features: [
      "질병 조기 감지",
      "영양소 결핍 분석",
      "해충 모니터링",
      "고해상도 이미징",
      "자동 진단 보고서",
      "처방 권장사항",
    ],
    compatibility: ["greenhouse", "vertical_farm", "indoor_garden"],
    certifications: ["ISO 9001", "CE"],
    imageUrl: "/plant-health-monitor.png",
  },
  {
    id: 4,
    name: "Automated Harvesting Robot",
    creator: "RoboFarm Innovations",
    type: "hemp",
    scale: "industrial",
    temperature: "low",
    humidity: "dry",
    power: "high",
    rating: 4.5,
    downloads: 432,
    lastUpdated: "2025-02-10",
    description:
      "Autonomous harvesting robot that uses computer vision and precise manipulators to identify and harvest ripe crops. Increases efficiency and reduces labor costs.",
    features: [
      "자율 수확 기능",
      "작물 성숙도 감지",
      "정밀 매니퓰레이터",
      "다양한 작물 지원",
      "24시간 운영 가능",
      "원격 모니터링",
    ],
    compatibility: ["field_crops", "orchard", "greenhouse"],
    certifications: ["ISO 9001", "CE", "UL"],
    imageUrl: "/futuristic-harvesting-robot.png",
  },
  {
    id: 5,
    name: "Soil Nutrient Analyzer",
    creator: "EcoSoil Labs",
    type: "cotton",
    scale: "medium",
    temperature: "medium",
    humidity: "normal",
    power: "low",
    rating: 4.7,
    downloads: 876,
    lastUpdated: "2025-04-10",
    description:
      "Portable soil analysis system that provides real-time data on nutrient levels, pH, and microbial activity. Helps optimize fertilizer application and soil health.",
    features: [
      "실시간 토양 분석",
      "영양소 수준 측정",
      "pH 모니터링",
      "미생물 활동 평가",
      "비료 권장사항",
      "데이터 기록 및 추적",
    ],
    compatibility: ["field_crops", "orchard", "greenhouse", "vertical_farm"],
    certifications: ["ISO 14001", "CE"],
    imageUrl: "/soil-analyzer.png",
  },
  {
    id: 6,
    name: "Climate Control System",
    creator: "ClimaTech Agricultural",
    type: "polyester",
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
    imageUrl: "/placeholder.svg?key=ewj0a",
  },
  {
    id: 7,
    name: "Precision Seeding Drone",
    creator: "AeroDrone Farming",
    type: "nylon",
    scale: "large",
    temperature: "medium",
    humidity: "normal",
    power: "medium",
    rating: 4.6,
    downloads: 567,
    lastUpdated: "2025-02-20",
    description:
      "Autonomous drone system for precision seeding and planting. Uses GPS mapping and AI to optimize seed placement and spacing for maximum yield.",
    features: [
      "정밀 파종 기능",
      "GPS 매핑",
      "AI 최적화 배치",
      "다양한 종자 호환성",
      "자동 경로 계획",
      "작업 보고서 생성",
    ],
    compatibility: ["field_crops", "reforestation"],
    certifications: ["ISO 9001", "CE", "FAA Approved"],
    imageUrl: "/seeding-drone.png",
  },
  {
    id: 8,
    name: "Livestock Monitoring System",
    creator: "AnimalTech Solutions",
    type: "wool",
    scale: "medium",
    temperature: "low",
    humidity: "dry",
    power: "medium",
    rating: 4.7,
    downloads: 789,
    lastUpdated: "2025-03-22",
    description:
      "Comprehensive monitoring system for livestock health and behavior. Tracks vital signs, movement patterns, and feeding habits to detect health issues early.",
    features: [
      "건강 상태 모니터링",
      "행동 패턴 분석",
      "급식 습관 추적",
      "위치 추적",
      "자동 알림 시스템",
      "데이터 기반 인사이트",
    ],
    compatibility: ["dairy_farm", "cattle_ranch", "poultry_farm"],
    certifications: ["ISO 9001", "CE", "Animal Welfare Approved"],
    imageUrl: "/livestock-monitor.png",
  },
]

// 상태 관리 부분도 타입을 명시합니다
export default function ResultsPage() {
  const router = useRouter()
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(containers[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // 컨테이너 선택 처리 함수도 타입을 명시합니다
  const handleSelectContainer = (container: Container) => {
    setSelectedContainer(container)
  }

  // 필터링된 컨테이너 목록
  const filteredContainers = containers.filter((container) =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 호환성 표시 함수를 수정합니다
  const renderCompatibility = (compatibility: CompatibilityType[]) => {
    const compatibilityMap: Record<CompatibilityType, string> = {
      greenhouse: "온실",
      vertical_farm: "수직 농장",
      hydroponic_system: "수경 재배",
      field_crops: "밭작물",
      orchard: "과수원",
      indoor_garden: "실내 정원",
      dairy_farm: "낙농장",
      cattle_ranch: "목장",
      poultry_farm: "양계장",
      reforestation: "재조림",
    }

    return compatibility.map((item) => (
      <Badge key={item} variant="outline" className="mr-1 mb-1">
        {compatibilityMap[item]}
      </Badge>
    ))
  }

  // 등급 표시 함수
  const renderRating = (rating: any) => {
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

        {/* 패턴 요소들 - 농업 관련 아이콘 */}
        <div className="hidden md:block absolute top-20 right-10 rotate-12 opacity-5">
          <Plant className="h-64 w-64 text-green-800 dark:text-green-700" />
        </div>
        <div className="hidden md:block absolute bottom-20 left-10 -rotate-12 opacity-5">
          <Server className="h-48 w-48 text-blue-800 dark:text-blue-700" />
        </div>

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
            <Leaf className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              SmartFarm Hub
            </Link>
          </div>

          <div className="relative w-full max-w-sm px-4">
            <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="농사 컨테이너 검색..."
              className="w-full pl-10 rounded-full bg-muted"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              새 검색
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">농사 컨테이너 검색 결과</h1>
            <p className="text-muted-foreground">최적의 농업 인프라 컴포넌트를 찾아보세요</p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* 필터 패널 (토글 가능) */}
            {showFilters && (
              <div className="w-full md:w-64 shrink-0">
                <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">필터</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>직물 종류</Label>
                        <div className="space-y-2">
                          {["cotton", "polyester", "nylon", "wool", "silk", "hemp"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox id={`type-${type}`} />
                              <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                                {type === "cotton"
                                  ? "면직물 (Cotton)"
                                  : type === "polyester"
                                    ? "폴리에스터 (Polyester)"
                                    : type === "nylon"
                                      ? "나일론 (Nylon)"
                                      : type === "wool"
                                        ? "양모 (Wool)"
                                        : type === "silk"
                                          ? "실크 (Silk)"
                                          : "대마 (Hemp)"}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>규모</Label>
                        <div className="space-y-2">
                          {["small", "medium", "large", "industrial"].map((scale) => (
                            <div key={scale} className="flex items-center space-x-2">
                              <Checkbox id={`scale-${scale}`} />
                              <Label htmlFor={`scale-${scale}`} className="text-sm font-normal">
                                {scale === "small"
                                  ? "소규모 (Small)"
                                  : scale === "medium"
                                    ? "중규모 (Medium)"
                                    : scale === "large"
                                      ? "대규모 (Large)"
                                      : "산업용 (Industrial)"}
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
                        <Button className="w-full bg-green-600 hover:bg-green-700">필터 적용</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 컨테이너 목록 (왼쪽) */}
            <div className={`w-full ${selectedContainer ? "md:w-1/3" : "md:w-2/3"}`}>
              <div className="mb-4">
                <h2 className="text-xl font-bold">추천 농사 컨테이너</h2>
                <p className="text-muted-foreground">검색 조건에 맞는 {filteredContainers.length}개의 컨테이너</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredContainers.map((container) => (
                  <Card
                    key={container.id}
                    className={`cursor-pointer transition-all hover:border-green-500 shadow-sm hover:shadow-md bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm ${
                      selectedContainer?.id === container.id ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""
                    }`}
                    onClick={() => handleSelectContainer(container)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-md bg-muted shrink-0 overflow-hidden shadow-sm"
                          style={{
                            backgroundImage: `url(${container.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium truncate">{container.name}</h3>
                              <p className="text-sm text-muted-foreground">{container.creator}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {container.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {container.scale}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {container.temperature}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Download className="h-3 w-3 mr-1" />
                              {container.downloads}
                            </div>
                            <div className="flex items-center">{renderRating(container.rating)}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 컨테이너 상세 정보 (오른쪽) */}
            {selectedContainer && (
              <div className="w-full md:w-2/3">
                <Card className="sticky top-24 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedContainer.name}</CardTitle>
                        <CardDescription>by {selectedContainer.creator}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderRating(selectedContainer.rating)}
                        <Badge variant="outline" className="ml-2">
                          <Download className="h-3 w-3 mr-1" />
                          {selectedContainer.downloads}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        className="w-full md:w-1/3 h-48 rounded-md bg-muted overflow-hidden shadow-md"
                        style={{
                          backgroundImage: `url(${selectedContainer.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="w-full md:w-2/3">
                        <h3 className="text-lg font-medium mb-2">설명</h3>
                        <p className="text-muted-foreground mb-4">{selectedContainer.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">직물 종류</h4>
                            <p className="text-sm">{selectedContainer.type}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">규모</h4>
                            <p className="text-sm">{selectedContainer.scale}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">온도 범위</h4>
                            <p className="text-sm">{selectedContainer.temperature}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">습도 범위</h4>
                            <p className="text-sm">{selectedContainer.humidity}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">전력 소비</h4>
                            <p className="text-sm">{selectedContainer.power}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">최종 업데이트</h4>
                            <p className="text-sm">{selectedContainer.lastUpdated}</p>
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
                          {selectedContainer.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="compatibility" className="pt-4">
                        <h3 className="text-sm font-medium mb-2">호환 환경</h3>
                        <div className="flex flex-wrap">{renderCompatibility(selectedContainer.compatibility)}</div>

                        <h3 className="text-sm font-medium mt-4 mb-2">추천 조합</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {containers
                            .filter((c) => c.id !== selectedContainer.id)
                            .slice(0, 3)
                            .map((container) => (
                              <Card
                                key={container.id}
                                className="cursor-pointer hover:border-green-500 bg-white/70 dark:bg-gray-950/70"
                              >
                                <CardContent className="p-3">
                                  <div className="text-sm font-medium truncate">{container.name}</div>
                                  <div className="text-xs text-muted-foreground">{container.creator}</div>
                                  <div className="mt-1">{renderRating(container.rating)}</div>
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
                              {selectedContainer.certifications.map((cert) => (
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

                    <div className="flex flex-col md:flex-row gap-4 pt-4 justify-end">
                      <Button
                        className="bg-green-600 hover:bg-green-700 gap-2"
                        onClick={() => router.push("/modifypage")}
                      >
                        AI 에디터로 수정
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        다운로드
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm relative z-10">
        <div className="w-full flex flex-col gap-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold">SmartFarm Hub</span>
          </div>
          <div className="text-sm text-muted-foreground mr-5">© 2025 SmartFarm Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
