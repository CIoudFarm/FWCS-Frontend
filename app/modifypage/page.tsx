"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Leaf, Send, ArrowRight, Copy, Check, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIEditorPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "안녕하세요! 선택하신 파일을 수정하는 것을 도와드리겠습니다. 어떤 부분을 수정하고 싶으신가요?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 샘플 JSON 데이터 (이전 화면에서 선택한 파일)
  const [fileContent, setFileContent] = useState(`{
  "name": "Advanced Temperature Sensor",
  "type": "cotton",
  "scale": "medium",
  "temperature": "high",
  "humidity": "normal",
  "power": "low",
  "description": "High-precision temperature monitoring system with real-time alerts and historical data tracking."
}`)

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      let response = ""
      let updatedContent = fileContent

      // 간단한 키워드 기반 응답 로직
      if (inputValue.toLowerCase().includes("온도") || inputValue.toLowerCase().includes("temperature")) {
        response = "온도 설정을 'very-high'로 변경했습니다. 다른 수정이 필요하신가요?"
        updatedContent = fileContent.replace('"temperature": "high"', '"temperature": "very-high"')
      } else if (inputValue.toLowerCase().includes("습도") || inputValue.toLowerCase().includes("humidity")) {
        response = "습도 설정을 'high'로 변경했습니다. 다른 수정이 필요하신가요?"
        updatedContent = fileContent.replace('"humidity": "normal"', '"humidity": "high"')
      } else if (inputValue.toLowerCase().includes("설명") || inputValue.toLowerCase().includes("description")) {
        response = "설명을 업데이트했습니다. 다른 수정이 필요하신가요?"
        updatedContent = fileContent.replace(
          /"description": ".*?"/,
          '"description": "Advanced high-precision temperature monitoring system with enhanced real-time alerts, historical data tracking, and AI-powered analytics."',
        )
      } else if (inputValue.toLowerCase().includes("이름") || inputValue.toLowerCase().includes("name")) {
        response = "이름을 'Premium Temperature Sensor'로 변경했습니다. 다른 수정이 필요하신가요?"
        updatedContent = fileContent.replace(
          '"name": "Advanced Temperature Sensor"',
          '"name": "Premium Temperature Sensor"',
        )
      } else {
        response =
          "어떤 부분을 수정하고 싶으신가요? 온도(temperature), 습도(humidity), 설명(description), 이름(name) 등을 수정할 수 있습니다."
      }

      // AI 응답 메시지 추가
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setFileContent(updatedContent)
      setIsLoading(false)
    }, 1500)
  }

  // 엔터 키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 클립보드에 복사
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 완료 버튼 처리
  const handleComplete = () => {
    // 실제로는 수정된 파일을 저장하고 다음 페이지로 이동
    router.push("/simulationpage")
  }

  // 메시지 포맷팅
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
            <Badge variant="outline">AI 에디터</Badge>
            <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "복사됨" : "복사"}
            </Button>
            <Button variant="outline" onClick={() => router.push("/results")}>
              이전
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          {/* 왼쪽: AI 채팅 영역 */}
          <div className="flex flex-col h-full ml-5">
            <h2 className="text-xl font-bold mb-4">AI 어시스턴트</h2>
            <Card className="flex-1 overflow-hidden">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className={message.role === "user" ? "bg-green-100" : "bg-blue-100"}>
                          <AvatarFallback>{message.role === "user" ? "나" : "AI"}</AvatarFallback>
                          {message.role === "assistant" && <AvatarImage src="/abstract-ai-network.png" />}
                        </Avatar>
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-800"
                            }`}
                          >
                            {message.content}
                          </div>
                          <div
                            className={`text-xs text-gray-500 mt-1 ${
                              message.role === "user" ? "text-right" : "text-left"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="bg-blue-100">
                          <AvatarFallback>AI</AvatarFallback>
                          <AvatarImage src="/abstract-ai-network.png" />
                        </Avatar>
                        <div>
                          <div className="rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="AI에게 파일 수정에 대해 질문하세요..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="min-h-[60px] resize-none"
                    />
                    <Button
                      className="bg-green-600 hover:bg-green-700 h-[60px] px-3"
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 파일 에디터 영역 */}
          <div className="flex flex-col h-full mr-5">
            <h2 className="text-xl font-bold mb-4">파일 에디터</h2>
            <Card className="flex-1 overflow-hidden">
              <CardContent className="p-0 h-full flex flex-col">
                <Tabs defaultValue="editor" className="flex-1 flex flex-col">
                  <div className="border-b px-4">
                    <TabsList className="h-12">
                      <TabsTrigger value="editor">에디터</TabsTrigger>
                      <TabsTrigger value="preview">미리보기</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="editor" className="flex-1 p-0 m-0 data-[state=active]:flex flex-col">
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-gray-50 dark:bg-gray-900">
                      <pre className="whitespace-pre-wrap">{fileContent}</pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="flex-1 p-0 m-0 data-[state=active]:flex flex-col">
                    <div className="flex-1 p-4 overflow-auto">
                      <div className="space-y-4">
                        {(() => {
                          try {
                            const data = JSON.parse(fileContent)
                            return (
                              <>
                                <div className="space-y-1">
                                  <h3 className="text-lg font-semibold">{data.name}</h3>
                                  <p className="text-sm text-gray-500">{data.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <p className="text-gray-500">Fabric Type:</p>
                                    <p className="font-medium">{data.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Scale:</p>
                                    <p className="font-medium">{data.scale}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Temperature:</p>
                                    <p className="font-medium">{data.temperature}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Humidity:</p>
                                    <p className="font-medium">{data.humidity}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Power:</p>
                                    <p className="font-medium">{data.power}</p>
                                  </div>
                                </div>
                              </>
                            )
                          } catch (e) {
                            return <p className="text-red-500">JSON 파싱 오류: 유효한 JSON 형식이 아닙니다.</p>
                          }
                        })()}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* 완료 버튼 */}
            <div className="mt-4 flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleComplete}>
                완료
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
