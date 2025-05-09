"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Leaf,
  ArrowLeft,
  Download,
  Thermometer,
  Droplet,
  Wind,
  Timer,
  Sprout,
  Calendar,
  AlertTriangle,
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Zap,
  DollarSign,
  Droplets,
  Lightbulb,
  Gauge,
  Scale,
  Recycle,
  Nut,
} from "lucide-react";

export default function PredictPage() {
  const [timeRange, setTimeRange] = useState("week");
  const [cropType, setCropType] = useState("all");
  const GrowthCurve = () => {
    // 샘플 데이터 (x: 시간, y: 생장률)

    const growthData = [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 35 },
      { x: 3, y: 50 },
      { x: 4, y: 68 },
      { x: 5, y: 85 },
      { x: 6, y: 95 },
    ];

    // SVG 경로 생성
    const pathData = growthData
      .map((point, index) =>
        index === 0
          ? `M ${point.x * 50} ${100 - point.y}`
          : `L ${point.x * 50} ${100 - point.y}`
      )
      .join(" ");

    return (
      <div className="flex flex-col items-center">
        <svg width="400" height="130" className="border rounded-md bg-gray-50">
          {/* X축 */}
          <line
            x1="0"
            y1="100"
            x2="400"
            y2="100"
            stroke="#ccc"
            strokeWidth="1"
          />
          {/* Y축 */}
          <line x1="0" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="1" />
          {/* 곡선 */}
          <path d={pathData} fill="none" stroke="#4caf50" strokeWidth="2" />
          {/* 데이터 포인트 */}
          {growthData.map((point, index) => (
            <circle
              key={index}
              cx={point.x * 50}
              cy={100 - point.y}
              r="3"
              fill="#4caf50"
            />
          ))}
        </svg>
      </div>
    );
  };
  const WaterCurve = () => {
    // 샘플 데이터 (x: 시간, y: 생장률)

    const growthData = [
      { x: 0, y: 10 },
      { x: 1, y: 10 },
      { x: 2, y: 25 },
      { x: 3, y: 60 },
      { x: 4, y: 88 },
      { x: 5, y: 92 },
      { x: 6, y: 95 },
    ];

    // SVG 경로 생성
    const pathData = growthData
      .map((point, index) =>
        index === 0
          ? `M ${point.x * 50} ${100 - point.y}`
          : `L ${point.x * 50} ${100 - point.y}`
      )
      .join(" ");

    return (
      <div className="flex flex-col items-center">
        <svg width="400" height="130" className="border rounded-md bg-gray-50">
          {/* X축 */}
          <line
            x1="0"
            y1="100"
            x2="400"
            y2="100"
            stroke="#ccc"
            strokeWidth="1"
          />
          {/* Y축 */}
          <line x1="0" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="1" />
          {/* 곡선 */}
          <path d={pathData} fill="none" stroke="#4caf50" strokeWidth="2" />
          {/* 데이터 포인트 */}
          {growthData.map((point, index) => (
            <circle
              key={index}
              cx={point.x * 50}
              cy={100 - point.y}
              r="3"
              fill="#4caf50"
            />
          ))}
        </svg>
      </div>
    );
  };
  const ElecCurve = () => {
    // 샘플 데이터 (x: 시간, y: 생장률)

    const growthData = [
      { x: 0, y: 1 },
      { x: 1, y: 5 },
      { x: 2, y: 19 },
      { x: 3, y: 30 },
      { x: 4, y: 40 },
      { x: 5, y: 50 },
      { x: 6, y: 80 },
    ];

    // SVG 경로 생성
    const pathData = growthData
      .map((point, index) =>
        index === 0
          ? `M ${point.x * 50} ${100 - point.y}`
          : `L ${point.x * 50} ${100 - point.y}`
      )
      .join(" ");

    return (
      <div className="flex flex-col items-center">
        <svg width="400" height="130" className="border rounded-md bg-gray-50">
          {/* X축 */}
          <line
            x1="0"
            y1="100"
            x2="400"
            y2="100"
            stroke="#ccc"
            strokeWidth="1"
          />
          {/* Y축 */}
          <line x1="0" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="1" />
          {/* 곡선 */}
          <path d={pathData} fill="none" stroke="#4caf50" strokeWidth="2" />
          {/* 데이터 포인트 */}
          {growthData.map((point, index) => (
            <circle
              key={index}
              cx={point.x * 50}
              cy={100 - point.y}
              r="3"
              fill="#4caf50"
            />
          ))}
        </svg>
      </div>
    );
  };
  const NutriCurve = () => {
    // 샘플 데이터 (x: 시간, y: 생장률)

    const growthData = [
      { x: 0, y: 1 },
      { x: 1, y: 10 },
      { x: 2, y: 29 },
      { x: 3, y: 30 },
      { x: 4, y: 40 },
      { x: 5, y: 50 },
      { x: 6, y: 60 },
    ];

    // SVG 경로 생성
    const pathData = growthData
      .map((point, index) =>
        index === 0
          ? `M ${point.x * 50} ${100 - point.y}`
          : `L ${point.x * 50} ${100 - point.y}`
      )
      .join(" ");

    return (
      <div className="flex flex-col items-center">
        <svg width="400" height="130" className="border rounded-md bg-gray-50">
          {/* X축 */}
          <line
            x1="0"
            y1="100"
            x2="400"
            y2="100"
            stroke="#ccc"
            strokeWidth="1"
          />
          {/* Y축 */}
          <line x1="0" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="1" />
          {/* 곡선 */}
          <path d={pathData} fill="none" stroke="#4caf50" strokeWidth="2" />
          {/* 데이터 포인트 */}
          {growthData.map((point, index) => (
            <circle
              key={index}
              cx={point.x * 50}
              cy={100 - point.y}
              r="3"
              fill="#4caf50"
            />
          ))}
        </svg>
      </div>
    );
  };
  const ProduceCurve = () => {
    // 샘플 데이터 (x: 시간, y: 생장률)

    const growthData = [
      { x: 0, y: 1 },
      { x: 1, y: 30 },
      { x: 2, y: 49 },
      { x: 3, y: 50 },
      { x: 4, y: 60 },
      { x: 5, y: 70 },
      { x: 6, y: 90 },
    ];

    // SVG 경로 생성
    const pathData = growthData
      .map((point, index) =>
        index === 0
          ? `M ${point.x * 100} ${200 - point.y * 2}`
          : `L ${point.x * 100} ${200 - point.y * 2}`
      )
      .join(" ");

    return (
      <div className="flex flex-col items-center">
        <svg width="640" height="200" className="border rounded-md bg-gray-50">
          {/* X축 */}
          <line
            x1="0"
            y1="200"
            x2="600"
            y2="200"
            stroke="#ccc"
            strokeWidth="2"
          />
          {/* Y축 */}
          <line x1="0" y1="0" x2="0" y2="200" stroke="#ccc" strokeWidth="2" />
          {/* 곡선 */}
          <path d={pathData} fill="none" stroke="#4caf50" strokeWidth="2" />
          {/* 데이터 포인트 */}
          {growthData.map((point, index) => (
            <circle
              key={index}
              cx={point.x * 100}
              cy={200 - point.y * 2}
              r="5"
              fill="#4caf50"
            />
          ))}
        </svg>
      </div>
    );
  };
  const MoneyCurve = () => {
    // 샘플 데이터 (x: 시간, y: 생장률)

    const growthData = [
      { x: 0, y: 1 },
      { x: 1, y: 5 },
      { x: 2, y: 19 },
      { x: 3, y: 30 },
      { x: 4, y: 40 },
      { x: 5, y: 50 },
      { x: 6, y: 80 },
    ];

    // SVG 경로 생성
    const pathData = growthData
      .map((point, index) =>
        index === 0
          ? `M ${point.x * 100} ${200 - point.y * 2}`
          : `L ${point.x * 100} ${200 - point.y * 2}`
      )
      .join(" ");

    return (
      <div className="flex flex-col items-center">
        <svg width="640" height="200" className="border rounded-md bg-gray-50">
          {/* X축 */}
          <line
            x1="0"
            y1="200"
            x2="600"
            y2="200"
            stroke="#ccc"
            strokeWidth="2"
          />
          {/* Y축 */}
          <line x1="0" y1="0" x2="0" y2="200" stroke="#ccc" strokeWidth="2" />
          {/* 곡선 */}
          <path d={pathData} fill="none" stroke="#4caf50" strokeWidth="2" />
          {/* 데이터 포인트 */}
          {growthData.map((point, index) => (
            <circle
              key={index}
              cx={point.x * 100}
              cy={200 - point.y * 2}
              r="5"
              fill="#4caf50"
            />
          ))}
        </svg>
      </div>
    );
  };
  return (
    <div className="flex min-h-screen items-center flex-col bg-white">
      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">
              스마트팜 결과 분석
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">기간:</span>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">일간</SelectItem>
                    <SelectItem value="week">주간</SelectItem>
                    <SelectItem value="month">월간</SelectItem>
                    <SelectItem value="year">연간</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">작물:</span>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="작물 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="tomato">토마토</SelectItem>
                    <SelectItem value="lettuce">상추</SelectItem>
                    <SelectItem value="pepper">고추</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="environment" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            {/* <TabsTrigger
              value="environment"
              className="flex items-center gap-1"
            >
              <Thermometer className="h-4 w-4" />
              <span className="hidden md:inline">환경 데이터</span>
            </TabsTrigger> */}
            <TabsTrigger value="growth" className="flex items-center gap-1">
              <Sprout className="h-4 w-4" />
              <span className="hidden md:inline">작물 생장</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1">
              <Droplets className="h-4 w-4" />
              <span className="hidden md:inline">자원 소비</span>
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden md:inline">비용/효율</span>
            </TabsTrigger>
            {/* <TabsTrigger value="alerts" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden md:inline">이상 탐지</span>
            </TabsTrigger> */}
          </TabsList>

          {/* 1. 환경 데이터 변화 */}
          {/* <TabsContent value="environment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    시간별 온도 변화
                  </CardTitle>
                  <CardDescription>
                    지난{" "}
                    {timeRange === "day"
                      ? "24시간"
                      : timeRange === "week"
                      ? "7일"
                      : "30일"}{" "}
                    동안의 온도 변화
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <LineChart className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">온도 그래프</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">평균 온도</p>
                      <p className="font-medium">24.8°C</p>
                    </div>
                    <div>
                      <p className="text-gray-500">최고 온도</p>
                      <p className="font-medium">32.1°C</p>
                    </div>
                    <div>
                      <p className="text-gray-500">최저 온도</p>
                      <p className="font-medium">18.3°C</p>
                    </div>
                    <div>
                      <p className="text-gray-500">변동 폭</p>
                      <p className="font-medium">13.8°C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    시간별 습도 변화
                  </CardTitle>
                  <CardDescription>
                    지난{" "}
                    {timeRange === "day"
                      ? "24시간"
                      : timeRange === "week"
                      ? "7일"
                      : "30일"}{" "}
                    동안의 습도 변화
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <LineChart className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">습도 그래프</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">평균 습도</p>
                      <p className="font-medium">65.2%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">최고 습도</p>
                      <p className="font-medium">78.9%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">최저 습도</p>
                      <p className="font-medium">52.1%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">변동 폭</p>
                      <p className="font-medium">26.8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wind className="h-5 w-5 text-green-500" />
                    CO₂ 농도 변화
                  </CardTitle>
                  <CardDescription>
                    지난{" "}
                    {timeRange === "day"
                      ? "24시간"
                      : timeRange === "week"
                      ? "7일"
                      : "30일"}{" "}
                    동안의 CO₂ 농도 변화
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <LineChart className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">CO₂ 농도 그래프</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">평균 농도</p>
                      <p className="font-medium">850 ppm</p>
                    </div>
                    <div>
                      <p className="text-gray-500">최고 농도</p>
                      <p className="font-medium">1200 ppm</p>
                    </div>
                    <div>
                      <p className="text-gray-500">최저 농도</p>
                      <p className="font-medium">450 ppm</p>
                    </div>
                    <div>
                      <p className="text-gray-500">변동 폭</p>
                      <p className="font-medium">750 ppm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Timer className="h-5 w-5 text-purple-500" />
                    센서 데이터에 따른 자동 제어 로그
                  </CardTitle>
                  <CardDescription>
                    센서 데이터에 따른 액추에이터 작동 기록
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] overflow-auto border rounded-md p-3">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-09 14:32:15</span>
                        <span className="text-green-600">팬 작동 (HIGH)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-09 12:15:42</span>
                        <span className="text-blue-600">급수 작동 (ON)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-09 10:05:18</span>
                        <span className="text-green-600">팬 작동 (MED)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-09 08:30:55</span>
                        <span className="text-yellow-600">LED 작동 (ON)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-09 06:12:33</span>
                        <span className="text-blue-600">급수 작동 (ON)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-08 22:45:10</span>
                        <span className="text-green-600">팬 작동 (LOW)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-08 20:18:27</span>
                        <span className="text-yellow-600">LED 작동 (OFF)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">2025-05-08 18:05:42</span>
                        <span className="text-blue-600">급수 작동 (ON)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent> */}

          {/* 2. 작물 생장 예측 */}
          <TabsContent value="growth" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    작물 생장률
                  </CardTitle>
                  <CardDescription>현재 작물의 생장 상태</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200 stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        ></circle>
                        <circle
                          className="text-green-500 stroke-current"
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset="80"
                        ></circle>
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">68%</span>
                        <span className="text-sm text-gray-500">생장률</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        7일 후 예상 생장률
                      </p>
                      <p className="font-medium text-lg">85%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    수확 예상 시기
                  </CardTitle>
                  <CardDescription>작물별 수확 예상 시기</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>토마토</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">2025-06-15</span>
                        <span className="text-xs text-gray-500">D-37</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>상추</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">2025-05-25</span>
                        <span className="text-xs text-gray-500">D-16</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>고추</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">2025-07-10</span>
                        <span className="text-xs text-gray-500">D-62</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                      <GrowthCurve></GrowthCurve>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    생장 영향 요인 분석
                  </CardTitle>
                  <CardDescription>생장에 영향을 준 주요 요인</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">온도 적합성</span>
                        <span className="text-sm font-medium text-green-600">
                          92%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">습도 적합성</span>
                        <span className="text-sm font-medium text-yellow-600">
                          78%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          CO₂ 농도 적합성
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          95%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">광량 적합성</span>
                        <span className="text-sm font-medium text-red-600">
                          65%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">수분 적합성</span>
                        <span className="text-sm font-medium text-green-600">
                          88%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">주의:</span> 광량 부족으로
                      인해 생장률이 저하되고 있습니다. LED 조명 시간을 늘리는
                      것을 권장합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 3. 자원 소비 분석 */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />물 사용량
                  </CardTitle>
                  <CardDescription>기간별 물 사용량 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <WaterCurve></WaterCurve>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-500">일간</p>
                      <p className="font-medium">45L</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-500">주간</p>
                      <p className="font-medium">315L</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-500">월간</p>
                      <p className="font-medium">1,350L</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      작물별 물 사용량 (일간)
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">토마토</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                          <span className="text-sm">27L</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">상추</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className="text-sm">9L</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">고추</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className="text-sm">9L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    전력 소비량
                  </CardTitle>
                  <CardDescription>기간별 전력 소비량 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <ElecCurve></ElecCurve>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-yellow-50 rounded-md">
                      <p className="text-xs text-gray-500">일간</p>
                      <p className="font-medium">12.5kWh</p>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-md">
                      <p className="text-xs text-gray-500">주간</p>
                      <p className="font-medium">87.5kWh</p>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-md">
                      <p className="text-xs text-gray-500">월간</p>
                      <p className="font-medium">375kWh</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      장치별 전력 소비량 (일간)
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">LED 조명</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: "56%" }}
                            ></div>
                          </div>
                          <span className="text-sm">7kWh</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">팬</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: "24%" }}
                            ></div>
                          </div>
                          <span className="text-sm">3kWh</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">펌프</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className="text-sm">2.5kWh</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-green-500" />
                    영양제 투입량
                  </CardTitle>
                  <CardDescription>기간별 영양제 투입량 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <NutriCurve></NutriCurve>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-500">일간</p>
                      <p className="font-medium">250ml</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-500">주간</p>
                      <p className="font-medium">1.75L</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-500">월간</p>
                      <p className="font-medium">7.5L</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      영양제 종류별 투입량 (일간)
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">질소 (N)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                          <span className="text-sm">100ml</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">인 (P)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                          <span className="text-sm">75ml</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">칼륨 (K)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                          <span className="text-sm">75ml</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="cost" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    자원 소비 대비 작물 생산량
                  </CardTitle>
                  <CardDescription>자원 효율성 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <ProduceCurve></ProduceCurve>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">물 효율성</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">1L당 생산량</span>
                        <span className="text-sm font-medium">42g</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">업계 평균</span>
                        <span className="text-sm font-medium">35g</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">효율성 향상</span>
                        <span className="text-sm font-medium text-green-600">
                          +20%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">전력 효율성</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">1kWh당 생산량</span>
                        <span className="text-sm font-medium">150g</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">업계 평균</span>
                        <span className="text-sm font-medium">120g</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm">효율성 향상</span>
                        <span className="text-sm font-medium text-green-600">
                          +25%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Scale className="h-5 w-5 text-blue-500" />
                    자동화 전/후 비용 차이
                  </CardTitle>
                  <CardDescription>자동화 도입 효과 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <MoneyCurve></MoneyCurve>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 rounded-md">
                        <p className="text-sm text-gray-500">
                          자동화 전 월 비용
                        </p>
                        <p className="text-xl font-medium">₩2,850,000</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-md">
                        <p className="text-sm text-gray-500">
                          자동화 후 월 비용
                        </p>
                        <p className="text-xl font-medium">₩1,650,000</p>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">월 절감액</p>
                        <p className="text-sm font-medium text-green-600">
                          ₩1,200,000
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">연간 절감액</p>
                        <p className="text-sm font-medium text-green-600">
                          ₩14,400,000
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">투자 회수 기간</p>
                        <p className="text-sm font-medium">8.5개월</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* 4. 비용/효율 분석 */}
        </Tabs>
      </main>
    </div>
  );
}
