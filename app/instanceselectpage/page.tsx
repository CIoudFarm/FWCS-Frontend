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

// 컨테이너 타입 정의
interface Container {
  id: string
  name: string
  creater: string
  scale: string
  hit_range: string
  electricity: string
  humid: string
  functions: string[]
  setting_file: {
    env?: string
    temp?: number
    name?: string
    description?: string
    hardware?: {
      layers: number
      beds_per_layer: number
      sensors: { type: string; x: number; y: number }[]
      actuators: { type: string; x: number; y: number }[]
    }
    dimensions?: {
      width: string
      length: string
      height: string
    }
    plants?: {
      type: string
      name: string
      minTemp: number
      maxTemp: number
      minHumidity: number
      maxHumidity: number
      positions: { x: number; y: number; layer: number }[]
      growthStage: number
    }[]
  }
  added_at: string
  updated_at: string
  download_count: number
  stars: number
  imageUrl?: string
}

export default function IaaSPage() {
  const router = useRouter()

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
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null)

  // 컨테이너 데이터
  const [containers, setContainers] = useState<Container[]>([])
  const [loading, setLoading] = useState(true)

  // 데이터 가져오기
  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get("https://devcjs.co.kr/containers")
        console.log("컨테이너 데이터:", response.data)
        setContainers(response.data)
      } catch (error) {
        console.error("데이터 가져오기 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContainers()
  }, [])

  // 필터링된 컨테이너 목록
  const filteredContainers = containers.filter((container) => {
    const matchesSearch =
      container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (container.setting_file.description &&
        container.setting_file.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = !selectedType || container.creater === selectedType
    const matchesScale = !selectedScale || container.scale === selectedScale

    return matchesSearch && matchesType && matchesScale
  })

  // 컨테이너 제작자 목록
  const containerCreators = [...new Set(containers.map((container) => container.creater))]

  // 규모 목록
  const scaleOptions = [...new Set(containers.map((container) => container.scale))]

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

  // 컨테이너 선택 처리
  const handleContainerSelect = (container: Container) => {
    setSelectedContainer(container)
  }

  // 인스턴스 생성 처리
  const handleCreateInstance = () => {
    if (activeTab === "instance" && !selectedPlan) {
      alert("인스턴스 유형을 선택해주세요.")
      return
    }

    if (activeTab === "configuration" && !selectedContainer) {
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
                    className={`cursor-pointer transition-all ${
                      selectedPlan === "basic" ? "border-green-500 shadow-lg" : "hover:border-green-200"
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
                        className={`w-full ${
                          selectedPlan === "basic"
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
                    className={`cursor-pointer transition-all ${
                      selectedPlan === "standard" ? "border-green-500 shadow-lg" : "hover:border-green-200"
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
                        className={`w-full ${
                          selectedPlan === "standard"
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
                    className={`cursor-pointer transition-all ${
                      selectedPlan === "premium" ? "border-green-500 shadow-lg" : "hover:border-green-200"
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
                        className={`w-full ${
                          selectedPlan === "premium"
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
                            <Label>제작자</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="all-types"
                                  checked={selectedType === null}
                                  onCheckedChange={() => setSelectedType(null)}
                                />
                                <Label htmlFor="all-types" className="text-sm font-normal">
                                  모든 제작자
                                </Label>
                              </div>
                              {containerCreators.map((creator) => (
                                <div key={creator} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`type-${creator}`}
                                    checked={selectedType === creator}
                                    onCheckedChange={() => setSelectedType(creator)}
                                  />
                                  <Label htmlFor={`type-${creator}`} className="text-sm font-normal">
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
                      <div className={`w-full ${selectedContainer ? "md:w-1/2" : ""}`}>
                        <div className="mb-4">
                          <h2 className="text-xl font-bold">사용 가능한 시스템 ({filteredContainers.length})</h2>
                          <p className="text-muted-foreground">원하는 시스템을 선택하세요</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {loading ? (
                            <div className="text-center py-8">데이터를 불러오는 중...</div>
                          ) : filteredContainers.length > 0 ? (
                            filteredContainers.map((container) => (
                              <Card
                                key={container.id}
                                className={`cursor-pointer transition-all hover:border-green-500 shadow-sm hover:shadow-md ${
                                  selectedContainer?.id === container.id
                                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                                    : ""
                                }`}
                                onClick={() => handleContainerSelect(container)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-md bg-muted shrink-0 overflow-hidden shadow-sm relative">
                                      <div
                                        className="w-full h-full"
                                        style={{
                                          backgroundImage: `url(${container.imageUrl || "/smart-farm.png"})`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                        }}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h3 className="font-medium truncate">{container.name}</h3>
                                          <p className="text-sm text-muted-foreground">{container.creater}</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                      </div>
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        <Badge variant="secondary" className="text-xs">
                                          {container.creater}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                          {getScaleLabel(container.scale)}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                          {container.hit_range}
                                        </Badge>
                                      </div>
                                      <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Download className="h-3 w-3 mr-1" />
                                          {container.download_count}
                                        </div>
                                        <div className="flex items-center">{renderRating(container.stars)}</div>
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
                      {selectedContainer && (
                        <div className="w-full md:w-1/2">
                          <Card className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm shadow-lg">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{selectedContainer.name}</CardTitle>
                                  <CardDescription>by {selectedContainer.creater}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                  {renderRating(selectedContainer.stars)}
                                  <Badge variant="outline" className="ml-2">
                                    <Download className="h-3 w-3 mr-1" />
                                    {selectedContainer.download_count}
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
                                      backgroundImage: `url(${selectedContainer.imageUrl || "/smart-farm-system.png"})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                  />
                                </div>
                                <div className="w-full md:w-2/3">
                                  <h3 className="text-lg font-medium mb-2">설명</h3>
                                  <p className="text-muted-foreground mb-4">
                                    {selectedContainer.setting_file.description || "설명이 없습니다."}
                                  </p>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">제작자</h4>
                                      <p className="text-sm">{selectedContainer.creater}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">규모</h4>
                                      <p className="text-sm">{getScaleLabel(selectedContainer.scale)}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">온도 범위</h4>
                                      <p className="text-sm">{selectedContainer.hit_range}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">습도 범위</h4>
                                      <p className="text-sm">{selectedContainer.humid}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">전력 소비</h4>
                                      <p className="text-sm">{selectedContainer.electricity}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">최종 업데이트</h4>
                                      <p className="text-sm">
                                        {new Date(selectedContainer.updated_at).toLocaleDateString()}
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
                                    {selectedContainer.functions && selectedContainer.functions.length > 0 ? (
                                      selectedContainer.functions.map((feature, index) => (
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
                                  <h3 className="text-sm font-medium mb-2">호환 환경</h3>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedContainer.setting_file.env && (
                                      <Badge variant="outline" className="mr-1 mb-1">
                                        {selectedContainer.setting_file.env}
                                      </Badge>
                                    )}
                                    {selectedContainer.setting_file.plants &&
                                      selectedContainer.setting_file.plants.map((plant, index) => (
                                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                                          {plant.name}
                                        </Badge>
                                      ))}
                                  </div>

                                  <h3 className="text-sm font-medium mt-4 mb-2">추천 조합</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {containers
                                      .filter((c) => c.id !== selectedContainer.id)
                                      .slice(0, 3)
                                      .map((container) => (
                                        <Card
                                          key={container.id}
                                          className="cursor-pointer hover:border-green-500 bg-white/70 dark:bg-gray-950/70"
                                          onClick={() => handleContainerSelect(container)}
                                        >
                                          <CardContent className="p-3">
                                            <div className="text-sm font-medium truncate">{container.name}</div>
                                            <div className="text-xs text-muted-foreground">{container.creater}</div>
                                            <div className="mt-1">{renderRating(container.stars)}</div>
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
                                        {selectedContainer.setting_file.hardware && (
                                          <>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">레이어 수:</span>
                                              <span>{selectedContainer.setting_file.hardware.layers}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">레이어당 베드:</span>
                                              <span>{selectedContainer.setting_file.hardware.beds_per_layer}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">센서 수:</span>
                                              <span>
                                                {selectedContainer.setting_file.hardware.sensors?.length || 0}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">액추에이터 수:</span>
                                              <span>
                                                {selectedContainer.setting_file.hardware.actuators?.length || 0}
                                              </span>
                                            </div>
                                          </>
                                        )}
                                        {selectedContainer.setting_file.dimensions && (
                                          <>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">너비:</span>
                                              <span>{selectedContainer.setting_file.dimensions.width}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">길이:</span>
                                              <span>{selectedContainer.setting_file.dimensions.length}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-muted-foreground">높이:</span>
                                              <span>{selectedContainer.setting_file.dimensions.height}</span>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="text-sm font-medium mb-2">시스템 요구사항</h3>
                                      <div className="text-sm space-y-1">
                                        <p>• FWCS Hub 플랫폼 v2.0 이상</p>
                                        <p>• 인터넷 연결 (최소 1Mbps)</p>
                                        <p>• 호환 가능한 전원 공급 장치 ({selectedContainer.electricity})</p>
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

                    {!selectedContainer && !loading && filteredContainers.length > 0 && (
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
                        onClick={handleCreateInstance}
                        disabled={!selectedContainer}
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
