"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
} from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";

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
  | "reforestation";

// 컨테이너 타입을 정의합니다
interface Container {
  id: string; // 컨테이너의 고유 ID
  name: string;
  creater: string; // 컨테이너 제작자
  scale: string; // 컨테이너 크기 (예: "중형")
  hit_range: string; // 작동 범위 (예: "5-10m")
  electricity: string; // 전력 사양 (예: "220V")
  humid: string; // 습도 (예: "70%")
  functions: string[]; // 기능 설명 배열
  setting_file: {
    env: string; // 환경 설정 (예: "greenhouse")
    temp: number; // 온도 설정 (예: 24.5)
  };
  added_at: string; // 추가된 날짜 (ISO 8601 형식)
  updated_at: string; // 업데이트된 날짜 (ISO 8601 형식)
  download_count: number; // 다운로드 횟수
  stars: number; // 평점 (예: 4.7)
}

// 샘플 컨테이너 데이터의 타입을 Container[]로 변경합니다
// const containers: Container[] = [
//   {
//     id: "1",
//     name: "asd",
//     creator: "asd",
//     scale: "medium",
//     hit_range: "5-10m",
//     electricity: "220V",
//     humid: "70%",
//     functions: [
//       "온도 모니터링",
//       "습도 조절",
//       "전력 소비 분석",
//       "환경 데이터 기록",
//     ],
//     setting_file: {
//       env: "greenhouse",
//       temp: 24.5,
//     },
//     added_at: "2025-03-15",
//     updated_at: "2025-03-15",
//     download_count: 1245,
//     stars: 4.8,
//   },
// ];

// 상태 관리 부분도 타입을 명시합니다
export default function ResultsPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      if (idParam) {
        try {
          const parsedId = JSON.parse(decodeURIComponent(idParam));
          setContainerId(parsedId);
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
        }
      }
    }
  }, []);

  const [containerData, setContainerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [containers, setContainerList] = useState<Container[]>([]);
  const [containerId, setContainerId] = useState<string>("");

  const [selectedContainer, setSelectedContainer] =
    useState<Container>();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  // containerId를 기반으로 컨테이너 리스트 가져오기
  useEffect(() => {
    const fetchContainerListById = async (id: string): Promise<void> => {
      try {
        const response = await axios.get<Container[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/containers/${id}`
        );
        console.log("컨테이너 리스트 가져오기 성공:", response.data);
        setContainerList(response.data); // 컨테이너 리스트 저장
        console.log("컨테이너 리스트:", containers);
      } catch (error) {
        console.error("컨테이너 리스트 가져오기 실패:", error);
      } finally {
        setSelectedContainer(containers[0]); // 첫 번째 컨테이너를 선택
        setLoading(false);
      }
    };

    if (containerId) {
      fetchContainerListById(containerId);
      console.log("컨테이너 ID:", containerId);
    }
  }, [containerId]);

  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }
  // if (containerList.length === 0) {
  //   return <div>검색 결과가 없습니다.</div>;
  // }
  const handleClick = (id: string) => {
    router.push(`/modifypage?id=${id}`);
  };

  // 컨테이너 선택 처리 함수도 타입을 명시합니다
  const handleSelectContainer = (container: Container) => {
    setSelectedContainer(container);
  };

  // 필터링된 컨테이너 목록 이건쓸듯듯
  const filteredContainers = containers.filter((container) =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 호환성 표시 함수를 수정합니다 아마 안쓸듯듯
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
    };

    return compatibility.map((item) => (
      <Badge key={item} variant="outline" className="mr-1 mb-1">
        {compatibilityMap[item]}
      </Badge>
    ));
  };

  // 등급 표시 함수 이건쓸듯듯
  const renderRating = (rating: any) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

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
            <BrandIcon className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              FWCS Hub
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
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
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
            <p className="text-muted-foreground">
              최적의 농업 인프라 컴포넌트를 찾아보세요
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* 필터 패널 (토글 가능) */}
            {showFilters && (
              <div className="w-full md:w-64 shrink-0">
                <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">필터</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>직물 종류</Label>
                        <div className="space-y-2">
                          {[
                            "cotton",
                            "polyester",
                            "nylon",
                            "wool",
                            "silk",
                            "hemp",
                          ].map((type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`type-${type}`} />
                              <Label
                                htmlFor={`type-${type}`}
                                className="text-sm font-normal"
                              >
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
                          {["small", "medium", "large", "industrial"].map(
                            (scale) => (
                              <div
                                key={scale}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox id={`scale-${scale}`} />
                                <Label
                                  htmlFor={`scale-${scale}`}
                                  className="text-sm font-normal"
                                >
                                  {scale === "small"
                                    ? "소규모 (Small)"
                                    : scale === "medium"
                                    ? "중규모 (Medium)"
                                    : scale === "large"
                                    ? "대규모 (Large)"
                                    : "산업용 (Industrial)"}
                                </Label>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>평점</Label>
                        <div className="pt-2">
                          <Slider
                            defaultValue={[4]}
                            min={1}
                            max={5}
                            step={0.1}
                          />
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
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          필터 적용
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 컨테이너 목록 (왼쪽) */}
            <div
              className={`w-full ${
                selectedContainer ? "md:w-1/3" : "md:w-2/3"
              }`}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold">추천 농사 컨테이너</h2>
                <p className="text-muted-foreground">
                  검색 조건에 맞는 {filteredContainers.length}개의 컨테이너
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredContainers.map((container) => (
                  <Card
                    key={container.id}
                    className={`cursor-pointer transition-all hover:border-green-500 shadow-sm hover:shadow-md bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm ${
                      selectedContainer?.id === container.id
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : ""
                    }`}
                    onClick={() => handleSelectContainer(container)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-md bg-muted shrink-0 overflow-hidden shadow-sm"
                          style={{
                            // backgroundImage: `url(${container.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium truncate">
                                {container.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {container.creater}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {/* <Badge variant="secondary" className="text-xs">
                              {container.type}
                            </Badge> */}
                            <Badge variant="secondary" className="text-xs">
                              {container.scale}
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
                            <div className="flex items-center">
                              {renderRating(container.stars)}
                            </div>
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
                        <CardDescription>
                          by {selectedContainer.creater}
                        </CardDescription>
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
                      <div
                        className="w-full md:w-1/3 h-48 rounded-md bg-muted overflow-hidden shadow-md"
                        style={{
                          // backgroundImage: `url(${selectedContainer.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="w-full md:w-2/3">
                        <h3 className="text-lg font-medium mb-2">설명</h3>
                        <p className="text-muted-foreground mb-4">
                          {/* {selectedContainer.description} */}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              직물 종류
                            </h4>
                            {/* <p className="text-sm">{selectedContainer.type}</p> */}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">규모</h4>
                            <p className="text-sm">{selectedContainer.scale}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              온도 범위
                            </h4>
                            <p className="text-sm">
                              {selectedContainer.hit_range}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              습도 범위
                            </h4>
                            <p className="text-sm">{selectedContainer.humid}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              전력 소비
                            </h4>
                            <p className="text-sm">
                              {selectedContainer.electricity}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              최종 업데이트
                            </h4>
                            <p className="text-sm">
                              {selectedContainer.updated_at}
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
                          {selectedContainer.functions.map(
                            (functions, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>{functions}</span>
                              </div>
                            )
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="compatibility" className="pt-4">
                        <h3 className="text-sm font-medium mb-2">호환 환경</h3>
                        <div className="flex flex-wrap">
                          {/* {renderCompatibility(selectedContainer.compatibility)} */}
                        </div>

                        <h3 className="text-sm font-medium mt-4 mb-2">
                          추천 조합
                        </h3>
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
                                  <div className="text-sm font-medium truncate">
                                    {container.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {container.creater}
                                  </div>
                                  <div className="mt-1">
                                    {renderRating(container.stars)}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="specs" className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">인증</h3>
                            {/* <div className="flex flex-wrap gap-1">
                              {selectedContainer.certifications.map((cert) => (
                                <Badge key={cert} variant="outline">
                                  {cert}
                                </Badge>
                              ))}
                            </div> */}
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              기술 사양
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  센서 정확도:
                                </span>
                                <span>±0.1°C</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  응답 시간:
                                </span>
                                <span>{"<"} 1초</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  데이터 전송:
                                </span>
                                <span>Wi-Fi, Bluetooth, LoRa</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  배터리 수명:
                                </span>
                                <span>최대 5년</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  작동 온도:
                                </span>
                                <span>-30°C ~ 80°C</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  방수 등급:
                                </span>
                                <span>IP67</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              시스템 요구사항
                            </h3>
                            <div className="text-sm space-y-1">
                              <p>• FWCS Hub 플랫폼 v2.0 이상</p>
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
                        onClick={() => handleClick(selectedContainer.id)}
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
            <BrandIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold">FWCS Hub</span>
          </div>
          <div className="text-sm text-muted-foreground mr-5">
            © 2025 FWCS Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
