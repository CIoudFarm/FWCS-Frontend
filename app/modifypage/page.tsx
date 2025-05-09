"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Leaf,
  Send,
  ArrowRight,
  Copy,
  Check,
  Loader2,
  Brain,
  Code,
  Cpu,
  Network,
  Sparkles,
  Bot,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrandIcon } from "@/components/ui/brand-icon";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIEditorPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "안녕하세요! 선택하신 파일을 수정하는 것을 도와드리겠습니다. 어떤 부분을 수정하고 싶으신가요?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [containerId, setContainerId] = useState<string | null>(null);

  // 샘플 JSON 데이터 (이전 화면에서 선택한 파일)
  const [fileContent, setFileContent] = useState(`{
  "name": "Standard greenhouse type container",
  "type": "tomato, lettuce, pepper",
  "scale": "medium",
  "temperature": "medium",
  "humidity": "60%",
  "power": "low",
  "description": "High-precision temperature monitoring system with real-time alerts and historical data tracking."
}`);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      setContainerId(idParam);
    }
  }, []);
  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      let response = "";
      let updatedContent = fileContent;

      // 간단한 키워드 기반 응답 로직
      if (
        inputValue.toLowerCase().includes("온도") ||
        inputValue.toLowerCase().includes("temperature")
      ) {
        response =
          "온도 설정을 'very-high'로 변경했습니다. 다른 수정이 필요하신가요?";
        updatedContent = fileContent.replace(
          '"temperature": "medium"',
          '"temperature": "very-high"'
        );
      } else if (
        inputValue.toLowerCase().includes("습도") ||
        inputValue.toLowerCase().includes("humidity")
      ) {
        response =
          "습도 설정을 'high'로 변경했습니다. 다른 수정이 필요하신가요?";
        updatedContent = fileContent.replace(
          '"humidity": "60%"',
          '"humidity": "80%"'
        );
      } else if (
        inputValue.toLowerCase().includes("설명") ||
        inputValue.toLowerCase().includes("description")
      ) {
        response = "설명을 업데이트했습니다. 다른 수정이 필요하신가요?";
        updatedContent = fileContent.replace(
          /"description": ".*?"/,
          '"description": "Advanced high-precision temperature monitoring system with enhanced real-time alerts, historical data tracking, and AI-powered analytics."'
        );
      } else if (
        inputValue.toLowerCase().includes("이름") ||
        inputValue.toLowerCase().includes("name")
      ) {
        response =
          "이름을 'Premium Temperature Sensor'로 변경했습니다. 다른 수정이 필요하신가요?";
        updatedContent = fileContent.replace(
          '"name": "Advanced Temperature Sensor"',
          '"name": "Premium Temperature Sensor"'
        );
      } else {
        response =
          "어떤 부분을 수정하고 싶으신가요? 온도(temperature), 습도(humidity), 설명(description), 이름(name) 등을 수정할 수 있습니다.";
      }

      // AI 응답 메시지 추가
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setFileContent(updatedContent);
      setIsLoading(false);
    }, 1500);
  };

  // 엔터 키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 클립보드에 복사
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 완료 버튼 처리
  const handleComplete = (id: string) => {
    // 실제로는 수정된 파일을 저장하고 다음 페이지로 이동
    router.push(`/simulationpage?id=${id}`);
  };

  // 메시지 포맷팅
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* 배경 요소들 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-purple-50 dark:from-green-950/20 dark:via-background dark:to-purple-950/10"></div>

        {/* 왼쪽 상단 장식 */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-60"></div>

        {/* 오른쪽 하단 장식 */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60"></div>

        {/* 중앙 장식 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-blue-50 dark:bg-blue-900/10 blur-3xl opacity-40"></div>

        {/* 패턴 요소들 - AI 관련 아이콘 */}
        <div className="hidden md:block absolute top-20 right-10 rotate-12 opacity-5">
          <Brain className="h-64 w-64 text-purple-800 dark:text-purple-700" />
        </div>
        <div className="hidden md:block absolute bottom-20 left-10 -rotate-12 opacity-5">
          <Cpu className="h-48 w-48 text-blue-800 dark:text-blue-700" />
        </div>

        {/* 작은 아이콘 패턴 */}
        <div className="absolute top-1/4 left-1/5 opacity-10">
          <Code className="h-12 w-12 text-green-600 dark:text-green-500" />
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-10">
          <Network className="h-10 w-10 text-blue-600 dark:text-blue-500" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-10">
          <Sparkles className="h-14 w-14 text-yellow-600 dark:text-yellow-500" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10">
          <Bot className="h-16 w-16 text-purple-600 dark:text-purple-500" />
        </div>

        {/* 격자 패턴 */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>

        {/* 네트워크 연결 패턴 (선택 사항) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="network-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="1"
                fill="currentColor"
                className="text-blue-500"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#network-pattern)"
          />
        </svg>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <BrandIcon className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              FWCS Hub
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <Badge variant="outline">AI 에디터</Badge>
            <Button
              variant="outline"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "복사됨" : "복사"}
            </Button>

            <Button variant="outline" onClick={() => router.push("/mypage")}>
              이전
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              마이페이지
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">AI 파일 에디터</h1>
            <p className="text-muted-foreground">
              AI의 도움을 받아 농업 인프라 컴포넌트 파일을 수정하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-240px)]">
            {/* 왼쪽: AI 채팅 영역 */}
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                AI 어시스턴트
              </h2>
              <Card className="flex-1 overflow-hidden bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
                          }`}
                        >
                          <Avatar
                            className={
                              message.role === "user"
                                ? "bg-green-100"
                                : "bg-purple-100"
                            }
                          >
                            <AvatarFallback>
                              {message.role === "user" ? "나" : "AI"}
                            </AvatarFallback>
                            {message.role === "assistant" && (
                              <AvatarImage src="/abstract-ai-network.png" />
                            )}
                          </Avatar>
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.role === "user"
                                  ? "bg-green-600 text-white"
                                  : "bg-white dark:bg-gray-800 shadow-sm"
                              }`}
                            >
                              {message.content}
                            </div>
                            <div
                              className={`text-xs text-gray-500 mt-1 ${
                                message.role === "user"
                                  ? "text-right"
                                  : "text-left"
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
                          <Avatar className="bg-purple-100">
                            <AvatarFallback>AI</AvatarFallback>
                            <AvatarImage src="/abstract-ai-network.png" />
                          </Avatar>
                          <div>
                            <div className="rounded-lg p-3 bg-white dark:bg-gray-800 shadow-sm">
                              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t bg-white/50 dark:bg-gray-900/50">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="AI에게 파일 수정에 대해 질문하세요..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-[60px] resize-none bg-white/80 dark:bg-gray-950/80"
                      />
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 h-[60px] px-3"
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
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                파일 에디터
              </h2>
              <Card className="flex-1 overflow-hidden bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-0 h-full flex flex-col">
                  <Tabs defaultValue="editor" className="flex-1 flex flex-col">
                    <div className="border-b px-4 bg-white/50 dark:bg-gray-900/50">
                      <TabsList className="h-12">
                        <TabsTrigger value="editor">에디터</TabsTrigger>
                        <TabsTrigger value="preview">미리보기</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent
                      value="editor"
                      className="flex-1 p-0 m-0 data-[state=active]:flex flex-col"
                    >
                      <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-gray-50/80 dark:bg-gray-900/80">
                        <pre className="whitespace-pre-wrap">{fileContent}</pre>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="preview"
                      className="flex-1 p-0 m-0 data-[state=active]:flex flex-col"
                    >
                      <div className="flex-1 p-4 overflow-auto">
                        <div className="space-y-4">
                          {(() => {
                            try {
                              const data = JSON.parse(fileContent);
                              return (
                                <>
                                  <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">
                                      {data.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {data.description}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
                                      <p className="text-gray-500">
                                        Fabric Type:
                                      </p>
                                      <p className="font-medium">{data.type}</p>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
                                      <p className="text-gray-500">Scale:</p>
                                      <p className="font-medium">
                                        {data.scale}
                                      </p>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
                                      <p className="text-gray-500">
                                        Temperature:
                                      </p>
                                      <p className="font-medium">
                                        {data.temperature}
                                      </p>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
                                      <p className="text-gray-500">Humidity:</p>
                                      <p className="font-medium">
                                        {data.humidity}
                                      </p>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md">
                                      <p className="text-gray-500">Power:</p>
                                      <p className="font-medium">
                                        {data.power}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              );
                            } catch (e) {
                              return (
                                <p className="text-red-500">
                                  JSON 파싱 오류: 유효한 JSON 형식이 아닙니다.
                                </p>
                              );
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
                <Button
                  className="bg-green-600 hover:bg-green-700 gap-2"
                  onClick={() => handleComplete(containerId!)}
                >
                  완료
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm relative z-10">
        <div className="w-full flex flex-col gap-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 ml-5">
            <BrandIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold">FWCS Hub</span>
          </div>
          <div className="text-sm text-muted-foreground mr-5">
            © 2025 FWCS Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
