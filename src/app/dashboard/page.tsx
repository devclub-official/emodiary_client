"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/calendar";
import { useAuthStore } from "@/lib/store";
import { useDiaryStore } from "@/lib/store";
const { formatDate } = require("@/lib/calendar");

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

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
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            마음의 날씨
          </h1>
          <p className="text-gray-600">
            {user?.name ? `${user.name}님, ` : ""}오늘의 감정을 기록해보세요
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 캘린더 섹션 */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                감정 캘린더
              </h2>
              <p className="text-sm text-gray-600">
                날짜를 클릭하여 해당 날의 일기를 확인하거나 작성하세요
              </p>
            </div>
            <Calendar onDateClick={handleDateClick} />
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                오늘의 일기
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                AI와 함께 오늘 하루의 감정을 기록해보세요.
              </p>
              <Button
                onClick={handleWriteDiary}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                일기 작성하기
              </Button>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                감정 분석
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                최근 감정 패턴을 분석하고 인사이트를 확인하세요.
              </p>
              <Button
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={() => {
                  router.push("/analysis");
                }}
              >
                분석 보기
              </Button>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">설정</h3>
              <p className="text-gray-600 mb-6 text-sm">
                알림 설정 및 개인 정보를 관리하세요.
              </p>
              <Button
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={() => {
                  // TODO: 설정 페이지로 이동
                  // router.push('/settings');
                  console.log("설정 페이지로 이동");
                }}
              >
                설정하기
              </Button>
            </Card>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p className="italic font-light">
            "매일 조금씩, 당신의 마음을 돌보세요 💝"
          </p>
        </div>
      </div>
    </main>
  );
}
