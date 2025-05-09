"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Leaf,
  Download,
  Play,
  Pause,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Maximize,
  Save,
  Layers,
} from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

// Define types for our grid items
type SensorType = "temperature" | "humidity" | "soil" | "light"
type CropType = "lettuce" | "tomato" | "carrot" | "pepper"

interface GridItem {
  id: string
  type: "sensor" | "crop"
  subType: SensorType | CropType
  x: number
  y: number
  range: number
}

export default function GridSimulationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [gridItems, setGridItems] = useState<GridItem[]>([])
  const [selectedTool, setSelectedTool] = useState<"sensor" | "crop" | null>(null)
  const [selectedSubType, setSelectedSubType] = useState<SensorType | CropType>("temperature")
  const [time, setTime] = useState(12) // 24-hour format
  const [day, setDay] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 })

  // Initialize with some default items
  useEffect(() => {
    const initialItems: GridItem[] = [
      // Sensors (green)
      { id: "s1", type: "sensor", subType: "temperature", x: 250, y: 250, range: 200 },
      { id: "s2", type: "sensor", subType: "humidity", x: 650, y: 250, range: 200 },
      { id: "s3", type: "sensor", subType: "soil", x: 1050, y: 250, range: 200 },
      { id: "s4", type: "sensor", subType: "temperature", x: 250, y: 650, range: 200 },
      { id: "s5", type: "sensor", subType: "humidity", x: 650, y: 650, range: 200 },
      { id: "s6", type: "sensor", subType: "soil", x: 1050, y: 650, range: 200 },

      // Large area sensors
      { id: "ls1", type: "sensor", subType: "light", x: 450, y: 450, range: 400 },
      { id: "ls2", type: "sensor", subType: "light", x: 850, y: 450, range: 400 },
      { id: "ls3", type: "sensor", subType: "light", x: 1250, y: 450, range: 400 },

      // Crops (bottom rows - tomatoes)
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `c${i}`,
        type: "crop" as const,
        subType: "tomato" as CropType,
        x: 100 + i * 60,
        y: 750,
        range: 30,
      })),

      // Crops (bottom rows - peppers)
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `c${i + 20}`,
        type: "crop" as const,
        subType: "pepper" as CropType,
        x: 100 + i * 60,
        y: 800,
        range: 30,
      })),
    ]

    setGridItems(initialItems)
  }, [])

  // Simulate time passing when playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 0.5
          if (newTime >= 24) {
            setDay((prevDay) => prevDay + 1)
            return 0
          }
          return newTime
        })

        setProgress((prev) => {
          const newProgress = prev + 0.5
          return newProgress > 100 ? 0 : newProgress
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  // Draw the grid and items
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set background color (soil/ground)
    ctx.fillStyle = "#d2b48c"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Apply zoom and pan transformations
    ctx.save()
    ctx.translate(viewOffset.x, viewOffset.y)
    ctx.scale(zoom, zoom)

    // Draw grid lines
    ctx.strokeStyle = "#a08c6c"
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = 0; x <= 2400; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 1000)
      ctx.stroke()

      // Draw thicker lines every 200px
      if (x % 200 === 0) {
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 1000)
        ctx.stroke()
        ctx.lineWidth = 1

        // Draw coordinate numbers
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.fillText(x.toString(), x + 5, 15)
      }
    }

    // Horizontal lines
    for (let y = 0; y <= 1000; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(2400, y)
      ctx.stroke()

      // Draw thicker lines every 200px
      if (y % 200 === 0) {
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(2400, y)
        ctx.stroke()
        ctx.lineWidth = 1
      }
    }

    // Draw sensor ranges first (so they're behind the icons)
    gridItems.forEach((item) => {
      if (item.type === "sensor") {
        // Draw sensor range circle
        ctx.beginPath()
        ctx.arc(item.x, item.y, item.range, 0, Math.PI * 2)
        ctx.strokeStyle = "#4ade80"
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })

    // Draw grid items
    gridItems.forEach((item) => {
      if (item.type === "sensor") {
        // Draw sensor icon
        ctx.beginPath()
        ctx.arc(item.x, item.y, 15, 0, Math.PI * 2)
        ctx.fillStyle = "#4ade80"
        ctx.fill()
        ctx.strokeStyle = "#2e7d32"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw sensor icon based on subType
        ctx.fillStyle = "#2e7d32"
        ctx.font = "12px Arial"
        let icon = "S"
        switch (item.subType) {
          case "temperature":
            icon = "T"
            break
          case "humidity":
            icon = "H"
            break
          case "soil":
            icon = "S"
            break
          case "light":
            icon = "L"
            break
        }
        ctx.fillText(icon, item.x - 4, item.y + 4)
      } else if (item.type === "crop") {
        // Draw crop icon
        if (item.subType === "tomato") {
          // Tomato (red)
          ctx.beginPath()
          ctx.arc(item.x, item.y, 10, 0, Math.PI * 2)
          ctx.fillStyle = "#e53935"
          ctx.fill()
          ctx.strokeStyle = "#8e0000"
          ctx.lineWidth = 1
          ctx.stroke()

          // Stem
          ctx.beginPath()
          ctx.moveTo(item.x, item.y - 10)
          ctx.lineTo(item.x, item.y - 15)
          ctx.strokeStyle = "#2e7d32"
          ctx.lineWidth = 2
          ctx.stroke()
        } else if (item.subType === "pepper") {
          // Pepper (purple)
          ctx.beginPath()
          ctx.arc(item.x, item.y, 8, 0, Math.PI * 2)
          ctx.fillStyle = "#9c27b0"
          ctx.fill()
          ctx.strokeStyle = "#6a1b9a"
          ctx.lineWidth = 1
          ctx.stroke()

          // Stem
          ctx.beginPath()
          ctx.moveTo(item.x, item.y - 8)
          ctx.lineTo(item.x, item.y - 13)
          ctx.strokeStyle = "#2e7d32"
          ctx.lineWidth = 2
          ctx.stroke()
        } else if (item.subType === "lettuce") {
          // Lettuce (light green)
          ctx.beginPath()
          ctx.arc(item.x, item.y, 12, 0, Math.PI * 2)
          ctx.fillStyle = "#8bc34a"
          ctx.fill()
          ctx.strokeStyle = "#558b2f"
          ctx.lineWidth = 1
          ctx.stroke()
        } else if (item.subType === "carrot") {
          // Carrot (orange)
          ctx.beginPath()
          ctx.arc(item.x, item.y, 8, 0, Math.PI * 2)
          ctx.fillStyle = "#ff9800"
          ctx.fill()
          ctx.strokeStyle = "#e65100"
          ctx.lineWidth = 1
          ctx.stroke()

          // Green top
          ctx.beginPath()
          ctx.moveTo(item.x - 5, item.y - 8)
          ctx.lineTo(item.x + 5, item.y - 8)
          ctx.strokeStyle = "#4caf50"
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    })

    ctx.restore()
  }, [gridItems, zoom, viewOffset, time])

  // Handle canvas click to add new items
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTool) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    // Calculate position with zoom and pan offset
    const x = ((e.clientX - rect.left) * scaleX - viewOffset.x) / zoom
    const y = ((e.clientY - rect.top) * scaleY - viewOffset.y) / zoom

    // Round to nearest grid point (50px)
    const gridX = Math.round(x / 50) * 50
    const gridY = Math.round(y / 50) * 50

    const newItem: GridItem = {
      id: `${selectedTool}-${Date.now()}`,
      type: selectedTool,
      subType: selectedSubType as any,
      x: gridX,
      y: gridY,
      range: selectedTool === "sensor" ? 200 : 30,
    }

    setGridItems([...gridItems, newItem])
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setViewOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setViewOffset({ x: 0, y: 0 })
  }

  // Handle download configuration
  const handleDownload = () => {
    const config = {
      gridItems,
      simulationParameters: {
        day,
        time,
        progress,
      },
    }

    const jsonString = JSON.stringify(config, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "smartfarm-grid-config.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Format time for display (24-hour to 12-hour)
  const formatTime = (time: number) => {
    const hour = Math.floor(time)
    const minute = Math.round((time - hour) * 60)
    const period = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandIcon className="h-6 w-6 text-green-600" />
            <Link href="/" className="text-xl font-bold">
              FWCS Hub
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1.5">
              설정: {progress.toFixed(0)}% 완료
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5">
              ({Math.round(viewOffset.x)}, {Math.round(viewOffset.y)}, {zoom.toFixed(1)})
            </Badge>
            <Badge variant={isPlaying ? "default" : "outline"} className="px-3 py-1.5">
              {isPlaying ? "RUNNING" : "IDLE"}
            </Badge>
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              설정파일
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">연결성</Button>
            <Button variant="destructive">긴급정지</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-4">
        <div className="flex gap-4">
          {/* Left sidebar with tools */}
          <div className="w-40 bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
            <div className="text-center font-medium">식물</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === "crop" && selectedSubType === "tomato" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTool("crop")
                      setSelectedSubType("tomato")
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
                    토마토
                  </Button>
                </TooltipTrigger>
                <TooltipContent>토마토 작물 배치</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === "crop" && selectedSubType === "lettuce" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTool("crop")
                      setSelectedSubType("lettuce")
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    상추
                  </Button>
                </TooltipTrigger>
                <TooltipContent>상추 작물 배치</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === "crop" && selectedSubType === "pepper" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTool("crop")
                      setSelectedSubType("pepper")
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
                    고추
                  </Button>
                </TooltipTrigger>
                <TooltipContent>고추 작물 배치</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="text-center font-medium mt-4">센서</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === "sensor" && selectedSubType === "temperature" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTool("sensor")
                      setSelectedSubType("temperature")
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-green-600 mr-2 flex items-center justify-center">
                      <span className="text-white text-[8px]">T</span>
                    </div>
                    온도
                  </Button>
                </TooltipTrigger>
                <TooltipContent>온도 센서 배치</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === "sensor" && selectedSubType === "humidity" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTool("sensor")
                      setSelectedSubType("humidity")
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-green-600 mr-2 flex items-center justify-center">
                      <span className="text-white text-[8px]">H</span>
                    </div>
                    습도
                  </Button>
                </TooltipTrigger>
                <TooltipContent>습도 센서 배치</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === "sensor" && selectedSubType === "soil" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedTool("sensor")
                      setSelectedSubType("soil")
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-green-600 mr-2 flex items-center justify-center">
                      <span className="text-white text-[8px]">S</span>
                    </div>
                    토양
                  </Button>
                </TooltipTrigger>
                <TooltipContent>토양 센서 배치</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="mt-auto">
              <Button variant="outline" className="w-full" onClick={() => setSelectedTool(null)}>
                <Layers className="h-4 w-4 mr-2" />
                포인트
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (confirm("정말로 모든 항목을 삭제하시겠습니까?")) {
                  setGridItems([])
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              전체 삭제
            </Button>
          </div>

          {/* Main grid area */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-4 relative">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleReset}>
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            <canvas
              ref={canvasRef}
              width={2400}
              height={1000}
              className="border border-gray-300 w-full h-[calc(100vh-200px)] cursor-grab"
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setTime((prev) => (prev - 1 + 24) % 24)
                  setIsPlaying(false)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="h-8" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? "일시정지" : "시작하기"}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setTime((prev) => (prev + 1) % 24)
                  setIsPlaying(false)
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom panel with stats */}
        <div className="mt-4 bg-white rounded-lg shadow-md p-4">
          <Tabs defaultValue="status">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="status">상태</TabsTrigger>
              <TabsTrigger value="analytics">분석</TabsTrigger>
              <TabsTrigger value="logs">로그</TabsTrigger>
              <TabsTrigger value="settings">설정</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="p-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">센서 수</div>
                  <div className="text-2xl font-semibold">
                    {gridItems.filter((item) => item.type === "sensor").length}
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">작물 수</div>
                  <div className="text-2xl font-semibold">
                    {gridItems.filter((item) => item.type === "crop").length}
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">현재 시간</div>
                  <div className="text-2xl font-semibold">{formatTime(time)}</div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-500">시뮬레이션 일</div>
                  <div className="text-2xl font-semibold">Day {day}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="p-4">
              <div className="text-center text-gray-500">
                시뮬레이션이 진행 중일 때 분석 데이터가 여기에 표시됩니다.
              </div>
            </TabsContent>

            <TabsContent value="logs" className="p-4">
              <div className="font-mono text-sm bg-gray-100 p-3 rounded-md h-32 overflow-y-auto">
                <div>[{new Date().toLocaleTimeString()}] 시뮬레이션 초기화됨</div>
                <div>
                  [{new Date().toLocaleTimeString()}] 센서 {gridItems.filter((item) => item.type === "sensor").length}개
                  로드됨
                </div>
                <div>
                  [{new Date().toLocaleTimeString()}] 작물 {gridItems.filter((item) => item.type === "crop").length}개
                  로드됨
                </div>
                {isPlaying && <div>[{new Date().toLocaleTimeString()}] 시뮬레이션 실행 중...</div>}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">그리드 크기</label>
                  <Select defaultValue="50">
                    <SelectTrigger>
                      <SelectValue placeholder="그리드 크기 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25px</SelectItem>
                      <SelectItem value="50">50px</SelectItem>
                      <SelectItem value="100">100px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">시뮬레이션 속도</label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue placeholder="속도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">느림 (0.5x)</SelectItem>
                      <SelectItem value="normal">보통 (1x)</SelectItem>
                      <SelectItem value="fast">빠름 (2x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">센서 범위 표시</label>
                  <Select defaultValue="show">
                    <SelectTrigger>
                      <SelectValue placeholder="표시 여부 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="show">표시</SelectItem>
                      <SelectItem value="hide">숨김</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">좌표 표시</label>
                  <Select defaultValue="show">
                    <SelectTrigger>
                      <SelectValue placeholder="표시 여부 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="show">표시</SelectItem>
                      <SelectItem value="hide">숨김</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  설정 저장
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-white py-4">
        <div className="container text-center text-sm text-gray-500">© 2025 FWCS Hub. All rights reserved.</div>
      </footer>
    </div>
  )
}
