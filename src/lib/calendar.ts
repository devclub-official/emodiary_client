// 감정 타입 정의
export type EmotionType =
  | "happy"
  | "sad"
  | "angry"
  | "anxious"
  | "excited"
  | "calm"
  | "confused"
  | "grateful";

// 감정 이모티콘 매핑
export const emotionEmojis: Record<EmotionType, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  anxious: "😰",
  excited: "🤩",
  calm: "😌",
  confused: "😕",
  grateful: "🥰",
};

// 일기 데이터 타입
export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD 형식
  emotion: EmotionType;
  content: string;
  createdAt: string;
}

// 캘린더 날짜 타입
export interface CalendarDate {
  date: number;
  fullDate: string; // YYYY-MM-DD 형식
  isCurrentMonth: boolean;
  isToday: boolean;
  diaryEntry?: DiaryEntry;
}

// 월간 캘린더 데이터 생성 함수
export function generateCalendarDates(
  year: number,
  month: number
): CalendarDate[] {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);

  // 월요일부터 시작하도록 조정
  const dayOfWeek = firstDay.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startDate.setDate(startDate.getDate() - daysToSubtract);

  const dates: CalendarDate[] = [];
  const currentDate = new Date(startDate);

  // 6주 * 7일 = 42일 생성
  for (let i = 0; i < 42; i++) {
    const isCurrentMonth = currentDate.getMonth() === month;
    const isToday =
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getDate() === today.getDate();

    dates.push({
      date: currentDate.getDate(),
      fullDate: formatDate(currentDate),
      isCurrentMonth,
      isToday,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// 날짜 포맷팅 함수
export function formatDate(date: Date): string {
  // 로컬 타임존 기준 YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 월 이름 반환 함수
export function getMonthName(month: number): string {
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return monthNames[month];
}

// 요일 이름 반환 함수
export function getDayNames(): string[] {
  return ["월", "화", "수", "목", "금", "토", "일"];
}
