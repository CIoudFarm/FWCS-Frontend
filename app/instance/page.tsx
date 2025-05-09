"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Thermometer, Droplet, BarChart2 } from "lucide-react";
import SmartFarmEmulator from "@/components/smart-farm-emulator";
import SmartFarmLiver from "@/components/smart-farm-liver";
import PredictPage from "../predictpage/page";
import PredictPageLive from "../predictpage/pageforlive";
import axios from "axios";
axios;
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
export default function InstanceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const instanceId = params.id as string;
  const [Id, setId] = useState<string>("");
  const [baseConfig, setBaseConfig] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");

    if (idParam) {
      setId(idParam);

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/mypage/instances/${idParam}/download/`
        )
        .then((res) => {
          console.log(res);
          const settingFileValue = res.data;
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

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/mypage")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold ml-2">인스턴스 {instanceId}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px4 py-6">
        {/* 에뮬레이터 영역 (네모 박스) */}
        <Card className="mb-6">
        
          <SmartFarmLiver userConfig={userConfig} baseConfig={baseConfig} />
        </Card>

        {/* 대시보드 영역 */}
        <Card>
          <PredictPageLive></PredictPageLive>
        </Card>
      </main>
    </div>
  );
}
