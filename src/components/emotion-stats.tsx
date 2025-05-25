"use client";

import {
  emotionEmojis,
  type DiaryEntry,
  type EmotionType,
} from "@/lib/calendar";
import { TrendingUp, Heart, Palette, Calendar } from "lucide-react";

interface EmotionStatsProps {
  entries: DiaryEntry[];
  timeRange: "week" | "month";
}

export default function EmotionStats({
  entries,
  timeRange,
}: EmotionStatsProps) {
  // 기간에 따른 데이터 필터링
  const getFilteredEntries = () => {
    const now = new Date();
    const daysToSubtract = timeRange === "week" ? 7 : 30;
    const startDate = new Date(
      now.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
    );

    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate;
    });
  };

  const filteredEntries = getFilteredEntries();

  // 감정별 카운트 계산 (지원하는 4가지 감정만)
  const emotionCounts: Record<EmotionType, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
  };

  filteredEntries.forEach((entry) => {
    emotionCounts[entry.emotion]++;
  });

  function getEmotionLabel(emotion: EmotionType): string {
    const labels: Record<EmotionType, string> = {
      happy: "기쁨",
      sad: "슬픔",
      angry: "화남",
      anxious: "불안",
    };
    return labels[emotion];
  }

  // 가장 많은 감정 찾기
  const maxEmotion = Object.entries(emotionCounts).reduce(
    (max, [emotion, count]) =>
      count > max.count ? { emotion: emotion as EmotionType, count } : max,
    { emotion: "happy" as EmotionType, count: 0 }
  );

  // 긍정적 감정 비율 계산 (happy만 긍정적 감정으로 간주)
  const positiveEmotions: EmotionType[] = ["happy"];
  const positiveCount = positiveEmotions.reduce(
    (sum, emotion) => sum + emotionCounts[emotion],
    0
  );
  const positivePercentage =
    filteredEntries.length > 0
      ? Math.round((positiveCount / filteredEntries.length) * 100)
      : 0;

  // 감정 다양성 계산 (기록된 감정 종류 수)
  const emotionVariety = Object.values(emotionCounts).filter(
    (count) => count > 0
  ).length;

  if (filteredEntries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {timeRange === "week" ? "최근 1주일" : "최근 1개월"} 동안의 감정
            기록이 없어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 주요 감정 */}
      <div className="text-center p-4 bg-accent/30 rounded-xl">
        <div className="text-3xl mb-2">{emotionEmojis[maxEmotion.emotion]}</div>
        <h4 className="font-semibold text-foreground mb-1">
          가장 많이 느낀 감정
        </h4>
        <p className="text-lg font-medium text-foreground">
          {getEmotionLabel(maxEmotion.emotion)}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {maxEmotion.count}번 (
          {Math.round((maxEmotion.count / filteredEntries.length) * 100)}%)
        </p>
      </div>

      {/* 통계 목록 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" />
            <span className="text-foreground">긍정적 감정</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-foreground">
              {positivePercentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              {positiveCount}회
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <span className="text-foreground">감정 다양성</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-foreground">
              {emotionVariety}가지
            </div>
            <div className="text-xs text-muted-foreground">감정 표현</div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-foreground">기록 일수</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-foreground">
              {filteredEntries.length}일
            </div>
            <div className="text-xs text-muted-foreground">
              {timeRange === "week" ? "최근 1주일" : "최근 1개월"}
            </div>
          </div>
        </div>
      </div>

      {/* 인사이트 메시지 */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="text-center">
          <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-foreground leading-relaxed">
            {positivePercentage >= 70
              ? "정말 행복한 시간을 보내고 계시네요! 이 긍정적인 에너지를 계속 유지해보세요."
              : positivePercentage >= 50
              ? "균형 잡힌 감정 상태를 유지하고 계세요. 작은 기쁨들을 더 자주 찾아보는 건 어떨까요?"
              : positivePercentage >= 30
              ? "힘든 시간을 보내고 계시는군요. 자신을 돌보는 시간을 가져보세요."
              : "어려운 시기를 겪고 계시는 것 같아요. 주변 사람들과 이야기하거나 전문가의 도움을 받는 것도 좋습니다."}
          </p>
        </div>
      </div>
    </div>
  );
}
