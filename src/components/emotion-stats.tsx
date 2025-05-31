"use client";

import {
  emotionEmojis,
  type DiaryEntry,
  type EmotionType,
} from "@/lib/calendar";

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

  // 감정별 카운트 계산
  const emotionCounts: Record<EmotionType, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    excited: 0,
    calm: 0,
    confused: 0,
    grateful: 0,
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
      excited: "신남",
      calm: "평온",
      confused: "혼란",
      grateful: "감사",
    };
    return labels[emotion];
  }

  // 가장 많은 감정 찾기
  const maxEmotion = Object.entries(emotionCounts).reduce(
    (max, [emotion, count]) =>
      count > max.count ? { emotion: emotion as EmotionType, count } : max,
    { emotion: "happy" as EmotionType, count: 0 }
  );

  // 긍정적 감정 비율 계산
  const positiveEmotions: EmotionType[] = [
    "happy",
    "excited",
    "calm",
    "grateful",
  ];
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
          <div className="text-4xl mb-3">📈</div>
          <p className="text-gray-500">
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
      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
        <div className="text-3xl mb-2">{emotionEmojis[maxEmotion.emotion]}</div>
        <h4 className="font-semibold text-gray-800 mb-1">
          가장 많이 느낀 감정
        </h4>
        <p className="text-lg font-medium text-purple-600">
          {getEmotionLabel(maxEmotion.emotion)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {maxEmotion.count}번 (
          {Math.round((maxEmotion.count / filteredEntries.length) * 100)}%)
        </p>
      </div>

      {/* 통계 목록 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">😊</span>
            <span className="text-gray-700">긍정적 감정</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {positivePercentage}%
            </div>
            <div className="text-xs text-gray-500">{positiveCount}회</div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎨</span>
            <span className="text-gray-700">감정 다양성</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {emotionVariety}가지
            </div>
            <div className="text-xs text-gray-500">감정 표현</div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">📅</span>
            <span className="text-gray-700">기록 일수</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {filteredEntries.length}일
            </div>
            <div className="text-xs text-gray-500">
              {timeRange === "week" ? "최근 1주일" : "최근 1개월"}
            </div>
          </div>
        </div>
      </div>

      {/* 인사이트 메시지 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="text-center">
          <div className="text-2xl mb-2">💡</div>
          <p className="text-sm text-gray-700 leading-relaxed">
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
