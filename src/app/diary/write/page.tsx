"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DiaryWriteForm from "@/components/diary-write-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/calendar";
import { useThemeStore } from "@/lib/store";

export default function DiaryWritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentTheme } = useThemeStore();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isValidDate, setIsValidDate] = useState(true);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    const today = formatDate(new Date());

    if (dateParam) {
      // 미래 날짜 접근 차단 (문자열 비교)
      if (dateParam > today) {
        router.push("/dashboard");
        return;
      }

      setSelectedDate(dateParam);
      // TODO: PRD 요구사항 - 당일 날짜만 작성 가능하도록 제한
      // setIsValidDate(dateParam === today);
      setIsValidDate(true); // 테스트용
    } else {
      setSelectedDate(today);
      setIsValidDate(true);
    }
  }, [searchParams, router]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const formatDisplayDate = (dateStr: string) => {
    // YYYY-MM-DD 직접 파싱 (타임존 문제 방지)
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  if (!selectedDate) {
    return (
      <div
        className={`min-h-screen ${currentTheme.background} flex items-center justify-center`}
      >
        <div className="text-center">
          <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">날짜를 확인하고 있어요...</p>
        </div>
      </div>
    );
  }

  if (!isValidDate) {
    return (
      <main className={`min-h-screen ${currentTheme.background} p-4`}>
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                오늘 날짜만 작성 가능해요
              </h2>
              <p className="text-gray-600 mb-6">
                일기는 당일에만 작성할 수 있어요.
                <br />
                선택하신 날짜: {formatDisplayDate(selectedDate)}
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  돌아가기
                </Button>
                <Button
                  onClick={() => {
                    const today = formatDate(new Date());
                    router.push(`/diary/write?date=${today}`);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  오늘 일기 쓰기
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${currentTheme.background} p-4`}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="pt-8 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                감정 일기 작성
              </h1>
              <p className="text-gray-600 text-sm">
                {formatDisplayDate(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        {/* 일기 작성 폼 */}
        <DiaryWriteForm date={selectedDate} onBack={handleBack} />
      </div>
    </main>
  );
}
