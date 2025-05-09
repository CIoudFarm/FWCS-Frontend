import { Leaf, Loader2, Sprout, Cloud, Sun, Droplet } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
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
          <Sprout className="h-64 w-64 text-green-800 dark:text-green-700" />
        </div>
        <div className="hidden md:block absolute bottom-20 left-10 -rotate-12 opacity-5">
          <Cloud className="h-48 w-48 text-blue-800 dark:text-blue-700" />
        </div>

        {/* 작은 아이콘 패턴 */}
        <div className="absolute top-1/4 left-1/5 opacity-10">
          <Sun className="h-12 w-12 text-yellow-600 dark:text-yellow-500" />
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-10">
          <Droplet className="h-10 w-10 text-blue-600 dark:text-blue-500" />
        </div>

        {/* 격자 패턴 */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center">
        {/* 로고 및 로딩 애니메이션 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-green-600 opacity-75" />
          </div>
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-lg">
            <BrandIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* 로딩 텍스트 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">FWCS Hub</h1>
          <p className="text-muted-foreground">메인페이지 로딩 중입니다...</p>
        </div>

        {/* 로딩 바 */}
        <div className="w-full max-w-md h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full animate-loading-bar"></div>
        </div>

        {/* 로딩 점 애니메이션 */}
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-green-600 animate-bounce [animation-delay:0ms]"></div>
          <div className="h-2 w-2 rounded-full bg-green-600 animate-bounce [animation-delay:150ms]"></div>
          <div className="h-2 w-2 rounded-full bg-green-600 animate-bounce [animation-delay:300ms]"></div>
        </div>
      </div>
    </div>
  )
}
