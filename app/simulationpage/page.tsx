"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Download, ArrowLeft, BarChart } from "lucide-react";
import SmartFarmEmulator from "@/components/smart-farm-emulator";
import PredictPage from "../predictpage/page";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Slider } from "@/components/ui/slider";

// 사용자 설정 데이터 (예시)
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
  const [baseConfig, setBaseConfig] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");

    if (idParam) {
      setContainerId(idParam);

      axios
        .get(`https://devcjs.co.kr/containers/${idParam}/`)
        .then((res) => {
          const settingFileValue = res.data?.setting_file;
          console.log(settingFileValue);
          if (settingFileValue) {
            try {
              setBaseConfig(settingFileValue);
            } catch (err) {
              console.error("JSON 파싱 오류:", err);
            }
          } else {
            console.warn("setting_file 값이 응답에 없습니다.");
          }
        })
        .catch((error) => {
          console.error("설정 불러오기 실패:", error);
        });
    }
  }, []);

  const handleDownload = () => {
    const config = {
      userConfig,
      baseConfig,
      simulationState: { day, time },
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
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
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
            <h1 className="text-3xl font-bold tracking-tight">스마트팜 시뮬레이션</h1>
          </div>
          <p className="text-gray-600">
            스마트팜 환경에서 센서, 액추에이터, 로봇의 동작을 시뮬레이션합니다.
          </p>
        </div>

        {/* 시뮬레이션 영역 */}
        {baseConfig ? (
          <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200 shadow-md">
            <SmartFarmEmulator userConfig={userConfig} baseConfig={baseConfig} />
          </div>
        ) : (
          <p className="text-gray-500 text-center">설정 파일을 불러오는 중입니다...</p>
        )}

        {/* 식물 생존 환경 정보 */}
        <PredictPage />
      </main>

      <footer className="border-t bg-white mt-auto">
        <div className="container flex flex-col gap-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <BrandIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold">FWCS Hub</span>
          </div>
          <div className="text-sm text-gray-500">© 2025 FWCS Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
