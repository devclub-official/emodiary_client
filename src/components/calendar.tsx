"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  generateCalendarDates,
  getMonthName,
  getDayNames,
  emotionEmojis,
  type CalendarDate,
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

    return (
      <button
        key={calendarDate.fullDate}
        onClick={() => handleDateClick(calendarDate)}
        disabled={!isClickable}
        className={`
          relative h-12 w-full flex flex-col items-center justify-center
          transition-all duration-200 rounded-lg
          ${
            isClickable
              ? "hover:bg-purple-50 hover:shadow-sm cursor-pointer"
              : "cursor-default opacity-30"
          }
          ${
            calendarDate.isToday
              ? "bg-gradient-to-br from-purple-100 to-pink-100 ring-2 ring-purple-300"
              : ""
          }
          ${
            hasEntry && isClickable
              ? "bg-gradient-to-br from-rose-50 to-purple-50"
              : ""
          }
        `}
      >
        <span
          className={`
          text-sm font-medium
          ${calendarDate.isToday ? "text-purple-700 font-bold" : ""}
          ${!calendarDate.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
        `}
        >
          {calendarDate.date}
        </span>

        {hasEntry && diaryEntry && (
          <span className="text-lg leading-none mt-0.5">
            {emotionEmojis[diaryEntry.emotion]}
          </span>
        )}
      </button>
    );
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
      {/* 캘린더 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className="hover:bg-purple-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-semibold text-gray-800">
          {year}년 {getMonthName(month)}
        </h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="hover:bg-purple-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDates.map(renderCalendarDate)}
      </div>

      {/* 범례 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-100 to-pink-100 ring-1 ring-purple-300"></div>
            <span>오늘</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-rose-50 to-purple-50 ring-1 ring-gray-200"></div>
            <span>일기 작성됨</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
