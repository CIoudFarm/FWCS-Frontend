"use client";
import { Slider } from "@/components/ui/slider"; // shadcn slider 컴포넌트

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Download, ArrowLeft, BarChart } from "lucide-react";
import SmartFarmEmulator from "@/components/smart-farm-emulator";
import PredictPage from "../predictpage/page";
import { BrandIcon } from "@/components/ui/brand-icon";

// 기본 설정 데이터
const baseConfig = {
  dimensions: { width: "14m", length: "10m", height: "3m" },
  hardware: {
    layers: 3,
    beds_per_layer: 5,
    sensors: [
      {
        type: "temperature",
        positions: [
          { x: 0.1, y: 0.2, layer: 1 },
          { x: 0.7, y: 0.2, layer: 1 },
          { x: 0.1, y: 0.7, layer: 1 },
          { x: 0.7, y: 0.7, layer: 1 },
          { x: 0.3, y: 0.3, layer: 2 },
          { x: 0.8, y: 0.3, layer: 2 },
        ],
      },
      {
        type: "humidity",
        positions: [
          { x: 0.2, y: 0.3, layer: 1 },
          { x: 0.8, y: 0.3, layer: 1 },
          { x: 0.2, y: 0.8, layer: 1 },
          { x: 0.8, y: 0.8, layer: 1 },
          { x: 0.4, y: 0.4, layer: 2 },
          { x: 0.9, y: 0.4, layer: 2 },
        ],
      },
    ],
    actuators: [
      {
        type: "fan",
        positions: [
          { x: 0.05, y: 0.05, layer: 1 },
          { x: 0.95, y: 0.05, layer: 1 },
          { x: 0.05, y: 0.95, layer: 1 },
          { x: 0.95, y: 0.95, layer: 1 },
          { x: 0.05, y: 0.05, layer: 2 },
          { x: 0.95, y: 0.05, layer: 2 },
        ],
        control: {
          default: 0,
          options: [
            { value: 0, label: "OFF" },
            { value: 1, label: "LOW" },
            { value: 2, label: "MED" },
            { value: 3, label: "HIGH" },
          ],
          triggers: [
            {
              sensor: "temperature",
              operator: ">",
              value: 28,
              action: { value: 1 },
            },
            {
              sensor: "temperature",
              operator: ">",
              value: 30,
              action: { value: 2 },
            },
            {
              sensor: "temperature",
              operator: ">",
              value: 32,
              action: { value: 3 },
            },
          ],
        },
      },
      {
        type: "LED",
        positions: [
          { x: 0.25, y: 0.25, layer: 1 },
          { x: 0.5, y: 0.25, layer: 1 },
          { x: 0.75, y: 0.25, layer: 1 },
          { x: 0.25, y: 0.75, layer: 1 },
          { x: 0.5, y: 0.75, layer: 1 },
          { x: 0.75, y: 0.75, layer: 1 },
          { x: 0.25, y: 0.25, layer: 2 },
          { x: 0.5, y: 0.25, layer: 2 },
          { x: 0.75, y: 0.25, layer: 2 },
        ],
        control: {
          default: 0,
          options: [
            { value: 0, label: "OFF" },
            { value: 1, label: "ON" },
          ],
        },
      },
      {
        type: "pump",
        positions: [
          { x: 0.1, y: 0.5, layer: 1 },
          { x: 0.9, y: 0.5, layer: 1 },
          { x: 0.1, y: 0.5, layer: 2 },
          { x: 0.9, y: 0.5, layer: 2 },
        ],
        control: {
          default: 0,
          options: [
            { value: 0, label: "OFF" },
            { value: 1, label: "ON" },
          ],
          triggers: [
            {
              sensor: "humidity",
              operator: "<",
              value: 40,
              action: { value: 1 },
            },
          ],
        },
      },
    ],
    robots: [
      { id: "robot1", name: "로봇 1", layer: 1, position: { x: 0.5, y: 0.5 } },
      { id: "robot2", name: "로봇 2", layer: 2, position: { x: 0.3, y: 0.7 } },
    ],
    plants: [
      {
        type: "tomato",
        name: "토마토",
        minTemp: 18,
        maxTemp: 30,
        minHumidity: 50,
        maxHumidity: 80,
        positions: [
          { x: 0.2, y: 0.2, layer: 1 },
          { x: 0.4, y: 0.2, layer: 1 },
          { x: 0.6, y: 0.2, layer: 1 },
          { x: 0.3, y: 0.4, layer: 2 },
          { x: 0.5, y: 0.4, layer: 2 },
        ],
        growthStage: 70,
      },
      {
        type: "lettuce",
        name: "상추",
        minTemp: 15,
        maxTemp: 25,
        minHumidity: 60,
        maxHumidity: 85,
        positions: [
          { x: 0.2, y: 0.6, layer: 1 },
          { x: 0.4, y: 0.6, layer: 1 },
          { x: 0.6, y: 0.6, layer: 1 },
          { x: 0.3, y: 0.7, layer: 2 },
          { x: 0.5, y: 0.7, layer: 2 },
        ],
        growthStage: 85,
      },
      {
        type: "pepper",
        name: "고추",
        minTemp: 20,
        maxTemp: 32,
        minHumidity: 45,
        maxHumidity: 75,
        positions: [
          { x: 0.2, y: 0.8, layer: 1 },
          { x: 0.4, y: 0.8, layer: 1 },
          { x: 0.6, y: 0.8, layer: 1 },
          { x: 0.7, y: 0.6, layer: 2 },
          { x: 0.7, y: 0.8, layer: 2 },
        ],
        growthStage: 60,
      },
    ],
  },
};

// 사용자 설정 데이터 (실제로는 이전 페이지에서 전달받을 수 있음)
const userConfig = {
  name: "Advanced Temperature Sensor",
  type: "cotton",
  scale: "medium",
  temperature: "high",
  humidity: "normal",
  power: "low",
  description:
    "High-precision temperature monitoring system with real-time alerts and historical data tracking.",
};

export default function SimulationPage() {
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(12); // 24-hour format
  const [containerId, setContainerId] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");

      if (idParam) {
        try {
          setContainerId(idParam);
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
        }
      }
    }
  }, []);

  // 설정 파일 다운로드
  const handleDownload = () => {
    const config = {
      userConfig,
      baseConfig,
      simulationState: {
        day,
        time,
      },
    };

    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "smartfarm-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 시간 포맷팅
  const formatTime = (time: number) => {
    const hour = Math.floor(time);
    const minute = Math.round((time - hour) * 60);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="flex min-h-screen items-center flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandIcon className="ml-10 h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              FWCS Hub
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              설정파일
            </Button>
            <Button variant="outline" asChild>
              <Link href="/results">
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">
              스마트팜 시뮬레이션
            </h1>
          </div>
          <p className="text-gray-600">
            스마트팜 환경에서 센서, 액추에이터, 로봇의 동작을 시뮬레이션합니다.
          </p>
        </div>

        {/* 시뮬레이션 영역 */}
        <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200 shadow-md">
          <SmartFarmEmulator userConfig={userConfig} baseConfig={baseConfig} />
        </div>
        {/* 식물 생존 환경 정보 */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3 text-green-700">
            식물 생존 환경 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                토마토
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>적정 온도 범위</span>
                  <span>18°C ~ 30°C</span>
                </div>
                <div className="flex justify-between">
                  <span>적정 습도 범위</span>
                  <span>50% ~ 80%</span>
                </div>
                <div className="flex justify-between">
                  <span>생장 단계</span>
                  <span>70%</span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">주의사항:</span> 토마토는
                    온도가 30°C를 초과하면 생장이 저하되고, 35°C 이상에서는
                    꽃가루 발아가 억제됩니다. 18°C 이하에서는 생장이 느려지고
                    10°C 이하에서는 냉해를 입을 수 있습니다.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                상추
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>적정 온도 범위</span>
                  <span>15°C ~ 25°C</span>
                </div>
                <div className="flex justify-between">
                  <span>적정 습도 범위</span>
                  <span>60% ~ 85%</span>
                </div>
                <div className="flex justify-between">
                  <span>생장 단계</span>
                  <span>85%</span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">주의사항:</span> 상추는 서늘한
                    기후를 선호하며, 25°C 이상의 고온에서는 쓴맛이 강해지고
                    추대(꽃대 형성)가 발생할 수 있습니다. 5°C 이하에서는 생장이
                    정지됩니다.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                고추
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>적정 온도 범위</span>
                  <span>20°C ~ 32°C</span>
                </div>
                <div className="flex justify-between">
                  <span>적정 습도 범위</span>
                  <span>45% ~ 75%</span>
                </div>
                <div className="flex justify-between">
                  <span>생장 단계</span>
                  <span>60%</span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">주의사항:</span> 고추는 따뜻한
                    기후를 선호하며, 15°C 이하에서는 생장이 느려지고 10°C
                    이하에서는 냉해를 입을 수 있습니다. 35°C 이상의 고온에서는
                    꽃가루 발아가 억제됩니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PredictPage></PredictPage>
      </main>

      <footer className="border-t bg-white mt-auto">
        <div className="container flex flex-col gap-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <BrandIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold">FWCS Hub</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 FWCS Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
