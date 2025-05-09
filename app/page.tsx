"use client";

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Leaf, Search, Upload, ArrowRight, Cloud, Sun, Droplet, Server } from "lucide-react"

export default function SelectPage() {
  const [hoveredOption, setHoveredOption] = useState<"search" | "upload" | "iaas" | null>(null)
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* 배경 요소들 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50 dark:from-green-950/20 dark:via-background dark:to-green-950/10"></div>

        {/* 왼쪽 상단 장식 */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-60"></div>

        {/* 오른쪽 하단 장식 */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-60"></div>

        {/* 중앙 장식 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-32 bg-green-50 dark:bg-green-900/10 blur-3xl opacity-40"></div>

        {/* 패턴 요소들 */}
        <div className="hidden md:block absolute top-20 right-20">
          <Leaf className="h-32 w-32 text-green-100 dark:text-green-900/20 rotate-15" />
        </div>
        <div className="hidden md:block absolute bottom-20 left-20">
          <Leaf className="h-24 w-24 text-green-100 dark:text-green-900/20 -rotate-15" />
        </div>

        {/* 작은 아이콘 패턴 */}
        <div className="absolute top-1/4 left-1/4">
          <Cloud className="h-10 w-10 text-green-100 dark:text-green-900/20" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <Sun className="h-8 w-8 text-green-100 dark:text-green-900/20" />
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <Droplet className="h-6 w-6 text-green-100 dark:text-green-900/20" />
        </div>

        {/* 격자 패턴 (선택 사항) */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FWCS Hub</span>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button variant="outline" onClick={() => router.push("/results")}>
              이전
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/mypage")}>마이페이지</Button>
          </div>
        </div>


      </header>

      <main className="flex-1 w-full py-12 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                스마트 농업의 시작
              </h1>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                인프라를 검색하거나 직접 업로드하고 클라우드 기반 스마트팜을 구축하세요
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 인프라 검색 옵션 */}
            <Card
              className={`relative overflow-hidden group cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl ${hoveredOption === "search"
                  ? "border-green-500"
                  : "border-transparent hover:border-green-300"
                }`}
              onClick={() => router.push("/searchpage")}
              onMouseEnter={() => setHoveredOption("search")}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="h-[350px] p-8 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <Search className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">인프라 검색</h2>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  다양한 농업 인프라 컴포넌트를 검색하고 필터링하여 최적의
                  솔루션을 찾아보세요
                </p>
                <Button className="bg-green-600 hover:bg-green-700 group-hover:translate-x-1 transition-transform">
                  시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </Card>

            {/* 업로드 옵션 */}
            <Card
              className={`relative overflow-hidden group cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl ${hoveredOption === "upload"
                  ? "border-green-500"
                  : "border-transparent hover:border-green-300"
                }`}
              onClick={() => router.push("/uploadpage")}
              onMouseEnter={() => setHoveredOption("upload")}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="h-[350px] p-8 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <Upload className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">업로드</h2>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  자신만의 농업 인프라 컴포넌트를 업로드하고 커뮤니티와
                  공유하세요
                </p>
                <Button className="bg-green-600 hover:bg-green-700 group-hover:translate-x-1 transition-transform">
                  시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </Card>

            {/* 스마트팜 IaaS 옵션 */}
            <Card
              className={`relative overflow-hidden group cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl ${hoveredOption === "iaas" ? "border-green-500" : "border-transparent hover:border-green-300"
                }`}
              onClick={() => router.push("/instanceselectpage")}
              onMouseEnter={() => setHoveredOption("iaas")}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="h-[350px] p-8 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <Server className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">스마트팜 IaaS</h2>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  클라우드 기반 스마트팜 인프라를 즉시 구축하고 필요한 만큼 확장하세요
                </p>
                <Button className="bg-green-600 hover:bg-green-700 group-hover:translate-x-1 transition-transform">
                  인스턴스 생성
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </Card>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center space-y-2 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm p-6 rounded-lg">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium">검색 및 필터링</h3>
              <p className="text-muted-foreground">
                다양한 조건으로 필터링하여 필요한 농업 인프라를 쉽게 찾을 수
                있습니다
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm p-6 rounded-lg">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Upload className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium">간편한 업로드</h3>
              <p className="text-muted-foreground">
                몇 번의 클릭만으로 자신만의 농업 인프라 컴포넌트를 업로드할 수
                있습니다
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm p-6 rounded-lg">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Server className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium">클라우드 인프라</h3>
              <p className="text-muted-foreground">
                AWS 인스턴스처럼 필요한 스마트팜 인프라를 즉시 구축하고 관리할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm relative z-10">
        <div className="w-full flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">CloudFarm Hub</span>
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
            © 2025 CloudFarm Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
