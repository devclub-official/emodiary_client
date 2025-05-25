"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lock, Sparkles } from "lucide-react";
import {
  generateCalendarDates,
  getMonthName,
  getDayNames,
  type CalendarDate,
  formatDate,
} from "@/lib/calendar";
import { useDiaryStore } from "@/lib/store";
import { loadMockData } from "@/lib/mock-data";

interface CalendarProps {
  onDateClick?: (date: string) => void;
}

export default function Calendar({ onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { entries, getEntryByDate, setEntries } = useDiaryStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDates = generateCalendarDates(year, month);
  const dayNames = getDayNames();

  // 테스트용 더미 데이터 로드
  useEffect(() => {
    if (entries.length === 0) {
      const mockData = loadMockData();
      setEntries(mockData);
    }
  }, [entries.length, setEntries]);

  // TODO: 백엔드에서 해당 월의 일기 데이터 가져오기
  // useEffect(() => {
  //   const fetchMonthlyEntries = async () => {
  //     try {
  //       const response = await fetch(`/api/diary/monthly?year=${year}&month=${month + 1}`);
  //       const monthlyEntries = await response.json();
  //       setEntries(monthlyEntries);
  //     } catch (error) {
  //       console.error('월간 일기 데이터 로드 실패:', error);
  //     }
  //   };
  //   fetchMonthlyEntries();
  // }, [year, month]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (calendarDate: CalendarDate) => {
    if (!calendarDate.isCurrentMonth) return;
    onDateClick?.(calendarDate.fullDate);
  };

  const renderCalendarDate = (calendarDate: CalendarDate) => {
    const diaryEntry = getEntryByDate(calendarDate.fullDate);
    const hasEntry = !!diaryEntry;
    const isClickable = calendarDate.isCurrentMonth;

    // 현재 날짜와 비교하여 미래 날짜인지 확인
    const today = formatDate(new Date());
    const isFutureDate = calendarDate.fullDate > today;
    const isActuallyClickable = isClickable && !isFutureDate;

    // 버튼 스타일 클래스 결정
    const getButtonStyle = () => {
      if (!calendarDate.isCurrentMonth) {
        return "btn-calendar-default opacity-30";
      }
      if (isFutureDate) {
        return "btn-calendar-default opacity-40 cursor-not-allowed";
      }
      if (calendarDate.isToday) {
        return "btn-calendar-today";
      }
      if (hasEntry && diaryEntry) {
        switch (diaryEntry.emotion) {
          case "happy":
            return "btn-calendar-happy";
          case "sad":
            return "btn-calendar-sad";
          case "angry":
            return "btn-calendar-angry";
          case "anxious":
            return "btn-calendar-anxious";
          default:
            return "btn-calendar-default";
        }
      }
      return "btn-calendar-default";
    };

    return (
      <button
        key={calendarDate.fullDate}
        onClick={() => handleDateClick(calendarDate)}
        disabled={!isActuallyClickable}
        className={`
          relative h-16 w-full flex flex-col items-center justify-center
          ${getButtonStyle()}
          ${isActuallyClickable ? "cursor-pointer" : "cursor-not-allowed"}
        `}
      >
        <span className="text-sm font-bold mb-1">{calendarDate.date}</span>

        {hasEntry && diaryEntry && !isFutureDate && (
          <div className="relative">
            <Image
              src={`/${diaryEntry.emotion}.png`}
              alt={diaryEntry.emotion}
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <Sparkles className="w-2 h-2 text-current absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
        )}

        {isFutureDate && calendarDate.isCurrentMonth && (
          <Lock className="w-3 h-3 text-current opacity-50" />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* 캘린더 헤더 */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 border border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className="btn-game h-10 w-10 p-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            {year}년 {getMonthName(month)}
          </h2>
          <p className="text-sm text-muted-foreground">감정 캐릭터들의 달력</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="btn-game h-10 w-10 p-0"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* 캘린더 본체 */}
      <div className="p-6 rounded-3xl bg-card border-2 border-border shadow-lg">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className={`h-10 flex items-center justify-center text-sm font-bold rounded-xl
                ${index === 0 ? "text-red-500 bg-red-50" : ""}
                ${index === 6 ? "text-blue-500 bg-blue-50" : ""}
                ${
                  index !== 0 && index !== 6
                    ? "text-foreground bg-muted/50"
                    : ""
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 캘린더 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDates.map(renderCalendarDate)}
        </div>
      </div>

      {/* 범례 */}
      <div className="p-4 rounded-2xl bg-secondary/10 border border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg bg-foreground"></div>
            <span className="text-foreground font-medium">오늘</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg emotion-card-happy"></div>
            <span className="text-foreground font-medium">기쁨</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg emotion-card-sad"></div>
            <span className="text-foreground font-medium">슬픔</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg emotion-card-angry"></div>
            <span className="text-foreground font-medium">화남</span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg emotion-card-anxious"></div>
            <span className="text-foreground font-medium">불안</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">미래</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-foreground font-medium">일기 있음</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg bg-card border border-border"></div>
            <span className="text-muted-foreground">일기 없음</span>
          </div>
        </div>
      </div>
    </div>
  );
}
