"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/calendar";
import { useAuthStore, useThemeStore } from "@/lib/store";
import { useDiaryStore } from "@/lib/store";
import LogoutButton from "@/components/logout-button";
import { registerFCMOnLogin } from "@/lib/fcm-utils";
import {
  PenTool,
  BarChart3,
  Settings,
  User,
  Calendar as CalendarIcon,
} from "lucide-react";
const { formatDate } = require("@/lib/calendar");

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const { currentTheme, motivationalQuote } = useThemeStore();

  // 로그인 성공 시 FCM 토큰 등록
  useEffect(() => {
    const loginSuccess = searchParams.get("login");

    if (loginSuccess === "success" && user?.id) {
      // FCM 토큰 등록
      registerFCMOnLogin(parseInt(user.id));

      // URL에서 쿼리 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete("login");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams, user?.id]);

  const handleDateClick = (date: string) => {
    // 현재 날짜와 비교하여 미래 날짜는 접근 불가
    const today = formatDate(new Date());
    const selectedDate = new Date(date);
    const currentDate = new Date(today);

    if (selectedDate > currentDate) {
      // 미래 날짜는 접근 불가
      console.log("미래 날짜는 접근할 수 없습니다:", date);
      return;
    }

    // 해당 날짜에 일기가 있는지 확인
    const { getEntryByDate } = useDiaryStore.getState();
    const existingEntry = getEntryByDate(date);

    if (existingEntry) {
      // 기존 일기가 있으면 상세보기로 이동
      router.push(`/diary/view?date=${date}`);
    } else {
      // 일기가 없으면 작성 페이지로 이동
      router.push(`/diary/write?date=${date}`);
    }

    console.log(
      "선택된 날짜:",
      date,
      existingEntry ? "(기존 일기 있음)" : "(새 일기 작성)"
    );
  };

  const handleWriteDiary = () => {
    // 오늘 날짜로 일기 작성 페이지 이동
    const today = formatDate(new Date());
    router.push(`/diary/write?date=${today}`);
    console.log("일기 작성하기 클릭");
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-8 max-sm:p-4">
        {/* 헤더 */}
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                감정 캐릭터 다이어리
              </h1>
              <p className="text-muted-foreground">
                {user?.name ? (
                  <>
                    안녕하세요,{" "}
                    <span className="font-semibold text-foreground">
                      {user.name}
                    </span>
                    님!
                  </>
                ) : (
                  "오늘의 감정을 기록해보세요"
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleWriteDiary}
                className="btn-game h-11 px-6 border-accent-foreground"
              >
                <PenTool className="w-4 h-4 mr-2" />
                일기 작성
              </Button>
              <LogoutButton />
              <Button
                variant="outline"
                className="btn-game h-11 px-4"
                onClick={() => router.push("/settings")}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 빠른 액션 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              className="p-4 card-3d-interactive"
              onClick={handleWriteDiary}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">오늘의 일기</h3>
                  <p className="text-sm text-muted-foreground">
                    감정을 기록하세요
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 card-3d-interactive"
              onClick={() => router.push("/analysis")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">감정 분석</h3>
                  <p className="text-sm text-muted-foreground">
                    패턴을 확인하세요
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 card-3d-interactive"
              onClick={() => router.push("/profile")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">프로필</h3>
                  <p className="text-sm text-muted-foreground">
                    설정을 관리하세요
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* 캘린더 섹션 */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <CalendarIcon className="w-6 h-6 text-foreground" />
                <h2 className="text-xl font-bold text-foreground">
                  감정 캘린더
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                날짜를 클릭하여 일기를 작성하거나 확인하세요
              </p>
            </div>
            <Card className="p-6 card-3d max-sm:p-2 border-2">
              <Calendar onDateClick={handleDateClick} />
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 이번 주 요약 */}
            <Card className="p-6 card-3d-sm max-sm:p-4">
              <h3 className="font-semibold text-foreground mb-4">
                이번 주 요약
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    작성한 일기
                  </span>
                  <span className="font-semibold text-foreground">5일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    주요 감정
                  </span>
                  <span className="font-semibold text-foreground">😊 기쁨</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  이번 주 80% 완성
                </p>
              </div>
            </Card>
            {/* 감정 통계 */}
            <Card className="p-6 card-3d-sm max-sm:p-4">
              <h3 className="font-semibold text-foreground mb-4">최근 감정</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">기쁨</span>
                  <span className="text-sm font-medium ml-auto">40%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">평온</span>
                  <span className="text-sm font-medium ml-auto">30%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    스트레스
                  </span>
                  <span className="text-sm font-medium ml-auto">20%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">기타</span>
                  <span className="text-sm font-medium ml-auto">10%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 명언 섹션 */}
        <Card className="p-6 text-center bg-muted/30 card-3d max-sm:p-4">
          <p className="text-lg font-medium text-foreground italic">
            "{motivationalQuote}"
          </p>
        </Card>
      </div>
    </main>
  );
}
