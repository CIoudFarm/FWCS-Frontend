"use client"; // app 디렉토리라면 유지 / pages 디렉토리면 제거

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectPage() {
  const [selected, setSelected] = useState<"A" | "B" | null>(null);

  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-12">CloudFarm</h1>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl px-4">
        {/* Box A */}
        <div
          onClick={() => router.push("/searchpage")}
          className={`w-full md:w-[45%] h-[40vh] flex items-center justify-center rounded-2xl border-4 cursor-pointer transition-all duration-300 ${
            selected === "A"
              ? "border-green-500 bg-green-100"
              : "border-gray-300 bg-white hover:border-green-300"
          }`}
        >
          <span className="text-2xl font-semibold">인프라 검색</span>
        </div>

        {/* Box B */}
        <div
          onClick={() => router.push("/uploadpage")}
          className={`w-full md:w-[45%] h-[40vh] flex items-center justify-center rounded-2xl border-4 cursor-pointer transition-all duration-300 ${
            selected === "B"
              ? "border-green-500 bg-green-100"
              : "border-gray-300 bg-white hover:border-green-300"
          }`}
        >
          <span className="text-2xl font-semibold">업로드</span>
        </div>
      </div>

     
    </main>
  );
}
