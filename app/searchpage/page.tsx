"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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
import { BrandIcon } from "@/components/ui/brand-icon";

export default function Home() {
  // 상태 예시 (실제로는 useState로 관리되고 있어야 함)
  const [notes, setNotes] = useState<string>("");
  const [CropType, setCropType] = useState<string>("");
  const [budget, setBudget] = useState<number>();
  const [growingPeriod, setGrowingPeriod] = useState<number>();

  const router = useRouter();

  // 🔽 onClick에 넣을 핸들러 함수 정의
  const handleSearchClick = async () => {
    const requestData = {
      crop_type: CropType,
      growing_period: growingPeriod,
      budget: budget,
      notes: notes,
    };

    try {
      const response = await axios.post(
        "https://devcjs.co.kr/crops/search/",
        requestData
      );
      const result = response.data;
      const id = result.results.map((item: any) => item.container);
      console.log("서버 응답:", result);
      console.log("ID:", id);
      router.push(`/resultpage?id=${encodeURIComponent(JSON.stringify(id))}`);
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <BrandIcon className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold" onClick={() => router.push("/")}>FWCS Hub</span>
          </div>
          <div className="flex items-center gap-4 mr-5">
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/mypage")}>마이페이지</Button>
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
                    <Label htmlFor="crop-type">작물 종류</Label>
                    <Input
                      type="string"
                      placeholder="작물 종류를 입력하세요..."
                      value={CropType ?? ""}
                      onChange={(e) => setCropType(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="growing_period">재배기간</Label>
                    <Input
                      placeholder="재배기간을 입력하세요..."
                      type="number"
                      value={growingPeriod ?? ""}
                      onChange={(e) => setGrowingPeriod(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">예산</Label>
                    <Input
                      placeholder="예산을 입력하세요..."
                      type="number"
                      value={budget ?? ""}
                      onChange={(e) => setBudget(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">메모 </Label>
                    <Textarea
                      id="notes"
                      placeholder="작물 재배에 관한 특별한 요구사항이나 메모를 입력하세요..."
                      className="min-h-[100px]"
                      value={notes ?? ""}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                  type="button"
                  onClick={() => handleSearchClick()}
                >
                  <Search className="mr-2 h-5 w-5" />
                  검색하기
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
            <BrandIcon className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FWCS Hub</span>
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
            © 2025 FWCS Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
