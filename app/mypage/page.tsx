"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Leaf,
  Server,
  MoreHorizontal,
  Play,
  Pause,
  RefreshCw,
  Search,
  Plus,
  Settings,
  User,
  CreditCard,
  BarChart,
  Router,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { BrandIcon } from "@/components/ui/brand-icon";

// 인스턴스 타입 정의
interface Instance {
  id: string
  name: string
  type: "basic" | "standard" | "premium"
  status: "시작" | "중지됨"
  region: string
  start_date: string
}

export default function MyPage() {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("instances");

  // 검색 및 필터링 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const router = useRouter();

  const getdata = async () => {
    const datas = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/mypage/instances/`
    );

    console.log(datas.data);
    setInstances(datas.data);
  };

  useEffect(() => {
    getdata();
  }, []);

  // 인스턴스 데이터
  const [instances, setInstances] = useState<Instance[]>([]);

  // 인스턴스 상태 변경 함수
  const toggleInstanceStatus = (id: string,status : string) => {
    setInstances(
      instances.map((instance:any) => {
        if (instance.id === id) {
          const newStatus = instance.status === "시작" ? "중지됨" : "시작"
          return { ...instance, status: newStatus }
        }
        return instance;
      })
    );
    togglestate(id,(status === "시작" ? "중지됨": "시작"));
  };

  // 인스턴스 삭제 함수
  const deleteInstance = (id: string) => {
    if (confirm("정말로 이 인스턴스를 삭제하시겠습니까?")) {
      setInstances(instances.filter((instance:any) => instance.id !== id));
    }
  };

  const togglestate = async (id: any, status: any) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mypage/instances/${id}/status/`,
        {
          status: status
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getdata();
  };

  // 필터링된 인스턴스 목록
  const filteredInstances = instances.filter((instance) => {
    const matchesSearch =
      instance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instance.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || instance.status === statusFilter;
    const matchesType = typeFilter === "all" || instance.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // 상태 배지 렌더링 함수
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "시작":
        return <Badge className="bg-green-500">실행 중</Badge>
      case "중지됨":
        return <Badge variant="outline">중지됨</Badge>
      case "starting":
        return <Badge className="bg-blue-500">시작 중</Badge>;
      case "error":
        return <Badge className="bg-red-500">오류</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // 인스턴스 유형 표시 함수
  const getInstanceTypeLabel = (type: string) => {
    switch (type) {
      case "basic":
        return "기본형";
      case "standard":
        return "표준형";
      case "premium":
        return "고급형";
      default:
        return type;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 ml-5">
            <Link href="/" className="flex items-center gap-2">
              <BrandIcon className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">FWCS Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>프로필</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>설정</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>결제</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">
                마이 페이지
              </h1>
              <p className="text-muted-foreground">
                스마트팜 인스턴스를 관리하고 모니터링하세요
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-green-600 hover:bg-green-700">
                <Link href="/instanceselectpage" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />새 인스턴스 생성
                </Link>
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="instances">인스턴스</TabsTrigger>
            </TabsList>

            <TabsContent value="instances" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="인스턴스 검색..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="상태 필터" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 상태</SelectItem>
                        <SelectItem value="시작">실행 중</SelectItem>
                        <SelectItem value="중지됨">중지됨</SelectItem>
                        <SelectItem value="starting">시작 중</SelectItem>
                        <SelectItem value="error">오류</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="유형 필터" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 유형</SelectItem>
                        <SelectItem value="basic">기본형</SelectItem>
                        <SelectItem value="standard">표준형</SelectItem>
                        <SelectItem value="premium">고급형</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    필터 초기화
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    새로고침
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">
                          인스턴스 이름
                        </TableHead>
                        <TableHead>유형</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>지역</TableHead>
                        <TableHead>생성일</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInstances.length > 0 ? (
                        filteredInstances.map((instance) => (
                          <TableRow
                            key={instance.id}
                            // onClick={() =>
                            //   router.push(`/instance?id=${instance.id}`)
                            // }
                          >
                            <TableCell className="font-medium">
                              <h2
                                onClick={() =>
                                  router.push(`/instance?id=${instance.id}`)
                                }
                                className="hover:underline"
                              >
                                {instance.name}
                              </h2>
                              <div className="text-xs text-muted-foreground">
                                inst-{instance.id}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getInstanceTypeLabel(instance.type)}
                            </TableCell>
                            <TableCell>
                              {renderStatusBadge(instance.status)}
                            </TableCell>
                            <TableCell>{instance.region}</TableCell>
                            <TableCell>{instance.start_date}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {instance.status === "시작" ? (
                                  <Button variant="outline" size="sm" onClick={() => toggleInstanceStatus(instance.id,"시작")}>
                                    <Pause className="h-4 w-4 mr-1" />
                                    중지
                                  </Button>
                                ) : instance.status === "중지됨" ? (
                                  <Button variant="outline" size="sm" onClick={() => toggleInstanceStatus(instance.id,"중지됨")}>
                                    <Play className="h-4 w-4 mr-1" />
                                    시작
                                  </Button>
                                ) : null}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                   
                                
                                    <DropdownMenuItem>
                                      <h2
                                        className="flex w-full"
                                        onClick={() =>
                                          router.push(
                                            `/instance?id=${instance.id}`
                                          )
                                        }
                                      >
                                        모니터링
                                      </h2>
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() =>
                                        deleteInstance(instance.id)
                                      }
                                    >
                                      삭제
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center">
                              <Server className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">
                                인스턴스가 없습니다
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                {searchQuery ||
                                statusFilter !== "all" ||
                                typeFilter !== "all"
                                  ? "검색 조건에 맞는 인스턴스가 없습니다. 필터를 변경해보세요."
                                  : "새 인스턴스를 생성하여 스마트팜을 시작하세요."}
                              </p>
                              {searchQuery ||
                              statusFilter !== "all" ||
                              typeFilter !== "all" ? (
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSearchQuery("");
                                    setStatusFilter("all");
                                    setTypeFilter("all");
                                  }}
                                >
                                  필터 초기화
                                </Button>
                              ) : (
                                <Button className="bg-green-600 hover:bg-green-700">
                                  <Link
                                    href="/iaaspage"
                                    className="flex items-center"
                                  >
                                    <Plus className="mr-2 h-4 w-4" />새 인스턴스
                                    생성
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>통합 모니터링 대시보드</CardTitle>
                  <CardDescription>
                    모든 인스턴스의 상태를 한눈에 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">
                        모니터링 대시보드
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        인스턴스를 선택하여 실시간 모니터링 데이터를 확인하세요
                      </p>
                      <Button variant="outline">인스턴스 선택</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>결제 및 사용량</CardTitle>
                  <CardDescription>
                    결제 내역 및 리소스 사용량을 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">결제 정보</h3>
                      <p className="text-muted-foreground mb-4">
                        결제 방법을 등록하고 사용량에 따른 요금을 확인하세요
                      </p>
                      <Button variant="outline">결제 방법 관리</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>계정 설정</CardTitle>
                  <CardDescription>
                    계정 정보 및 알림 설정을 관리하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">설정</h3>
                      <p className="text-muted-foreground mb-4">
                        계정 정보, 보안 설정, 알림 환경설정을 관리하세요
                      </p>
                      <Button variant="outline">설정 관리</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
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
            © 2025 SmartFarm Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
