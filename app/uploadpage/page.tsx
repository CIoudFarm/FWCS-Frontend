"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Leaf, X, Upload, Tag, Plus, ArrowRight } from "lucide-react"

export default function FileUploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  // 파일 업로드 처리
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 여기서 파일, 태그, 설명을 서버에 제출하는 로직을 구현할 수 있습니다.
    console.log({
      fileName,
      fileSize,
      tags,
      description,
    })

    // 다음 페이지로 이동
    router.push("/ai-editor")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Leaf className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              SmartFarm Hub
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Button variant="outline" onClick={() => router.push("/results")}>
              이전
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">도움말</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">이름 설정</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 파일 업로드 영역 */}
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

              <div className="flex-1">
                {fileName ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{fileName}</span>
                    <span className="text-sm text-gray-500">({fileSize})</span>
                  </div>
                ) : (
                  <span className="text-gray-500">파일 업로드 시에 여기 파일 이름 보임</span>
                )}
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
                className="min-h-[200px] bg-gray-100"
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
        </div>
      </main>

      <footer className="border-t bg-background mt-auto">
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
