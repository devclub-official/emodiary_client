"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DiaryView from "@/components/diary-view";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, AlertCircle } from "lucide-react";
import { useDiaryStore } from "@/lib/store";
import type { DiaryEntry } from "@/lib/calendar";
import { formatDate } from "@/lib/calendar";

export default function DiaryViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getEntryByDate } = useDiaryStore();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    const dateParam = searchParams.get("date");

    if (dateParam) {
      // 미래 날짜 접근 차단 (문자열 비교, 로컬 기준)
      const today = formatDate(new Date());
      if (dateParam > today) {
        router.push("/dashboard");
        return;
      }

      setSelectedDate(dateParam);
      const entry = getEntryByDate(dateParam);
      setDiaryEntry(entry || null);
    }
  }, [searchParams, getEntryByDate, router]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  if (!selectedDate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">날짜를 확인하고 있어요...</p>
        </div>
      </div>
    );
  }

  if (!diaryEntry) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                작성된 일기가 없어요
              </h2>
              <p className="text-gray-600 mb-6">
                선택하신 날짜에는 아직 일기가 작성되지 않았어요.
                <br />
                날짜: {formatDisplayDate(selectedDate)}
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  돌아가기
                </Button>
                <Button
                  onClick={() => {
                    router.push(`/diary/write?date=${selectedDate}`);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  일기 작성하기
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 p-4">
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
                일기 보기
              </h1>
              <p className="text-gray-600 text-sm">저장된 일기를 확인하세요</p>
            </div>
          </div>
        </div>

        {/* 일기 상세보기 */}
        <DiaryView entry={diaryEntry} date={selectedDate} onBack={handleBack} />
      </div>
    </main>
  );
}
