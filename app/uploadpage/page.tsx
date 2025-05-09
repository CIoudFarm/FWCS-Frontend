"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, X, Upload, Tag, Plus, ArrowRight, FileText, Cloud, Sprout, Droplet, Sun } from "lucide-react"

export default function FileUploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  // 파일 업로드 처리
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFile(file)

      // 파일 크기 포맷팅 (KB 또는 MB)
      const size = file.size
      if (size < 1024 * 1024) {
        setFileSize(`${(size / 1024).toFixed(2)} KB`)
      } else {
        setFileSize(`${(size / (1024 * 1024)).toFixed(2)} MB`)
      }
    }
  }

  // 파일 업로드 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // 태그 추가
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  // 태그 삭제
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // 태그 입력 시 엔터 키 처리
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // 제출 처리
   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!file) return

  const formData = new FormData()
  formData.append("file", file)
  formData.append("tags", JSON.stringify(tags))
  formData.append("notes", description)
  console.log(formData)
  try {
    const response = await axios.post("https://devcjs.co.kr/crops/base-upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // ✅ 여기가 문제 발생 지점
    

    console.log("서버 응답:", response)
  } catch (error) {
    console.error("업로드 실패:", error)
  }
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

        {/* 패턴 요소들 - 농업 관련 아이콘 */}
        <div className="hidden md:block absolute top-20 right-10 rotate-12 opacity-10">
          <FileText className="h-64 w-64 text-green-800 dark:text-green-700" />
        </div>
        <div className="hidden md:block absolute bottom-20 left-10 -rotate-12 opacity-10">
          <Cloud className="h-48 w-48 text-blue-800 dark:text-blue-700" />
        </div>

        {/* 작은 아이콘 패턴 */}
        <div className="absolute top-1/4 left-1/5 opacity-20">
          <Sprout className="h-12 w-12 text-green-600 dark:text-green-500" />
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-20">
          <Droplet className="h-10 w-10 text-blue-600 dark:text-blue-500" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-20">
          <Sun className="h-14 w-14 text-yellow-600 dark:text-yellow-500" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20">
          <Leaf className="h-16 w-16 text-green-600 dark:text-green-500" />
        </div>

        {/* 격자 패턴 */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              SmartFarm Hub
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button className="bg-green-600 hover:bg-green-700" onClick={()=>router.push("/mypage")}>마이페이지</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full py-12 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Upload className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">파일 업로드</h1>
            <p className="text-muted-foreground mt-2">농업 인프라 컴포넌트 파일을 업로드하고 세부 정보를 입력하세요</p>
          </div>

          <Card className="border shadow-lg bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 파일 업로드 영역 */}
                <div className="space-y-3">
                  <label className="text-base font-medium">파일 선택</label>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-12 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800"
                      onClick={handleUploadClick}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      파일 업로드
                    </Button>

                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />

                    <div className="flex-1 p-3 border border-dashed rounded-md bg-gray-50">
                      {fileName ? (
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span className="text-gray-700">{fileName}</span>
                          <span className="text-sm text-gray-500">({fileSize})</span>
                        </div>
                      ) : (
                        <span className="text-gray-500 flex items-center justify-center h-6">파일을 선택하세요</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 태그 추가 영역 */}
                <div className="space-y-3">
                  <label className="text-base font-medium">태그 추가</label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="태그를 입력하고 엔터를 누르세요"
                        className="pr-10"
                      />
                      {tagInput && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={handleAddTag}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 p-0"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* 설명 입력 영역 */}
                <div className="space-y-3">
                  <label className="text-base font-medium">설명 입력</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="파일에 대한 설명을 입력하세요"
                    className="min-h-[200px] bg-gray-50"
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 gap-2" disabled={!fileName}>
                    다음 단계
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              파일 업로드에 문제가 있으신가요?{" "}
              <Link href="#" className="text-green-600 hover:underline">
                도움말 센터
              </Link>
              를 방문하세요.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm relative z-10">
        <div className="w-full flex flex-col gap-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold">SmartFarm Hub</span>
          </div>
          <div className="text-sm text-muted-foreground mr-5">© 2025 SmartFarm Hub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}