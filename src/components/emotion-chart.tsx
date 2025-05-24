"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  emotionEmojis,
  type DiaryEntry,
  type EmotionType,
} from "@/lib/calendar";

interface EmotionChartProps {
  entries: DiaryEntry[];
  timeRange: "week" | "month";
}

export default function EmotionChart({
  entries,
  timeRange,
}: EmotionChartProps) {
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

  // 차트 데이터 변환 (0이 아닌 것만)
  const chartData = Object.entries(emotionCounts)
    .filter(([_, count]) => count > 0)
    .map(([emotion, count]) => ({
      name: emotion,
      value: count,
      emoji: emotionEmojis[emotion as EmotionType],
      label: getEmotionLabel(emotion as EmotionType),
      percentage: Math.round((count / filteredEntries.length) * 100),
    }));

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

  // 파스텔 톤 색상
  const colors = [
    "#FF6B9D", // 핑크
    "#845EC2", // 퍼플
    "#4E9F3D", // 그린
    "#FF8C42", // 오렌지
    "#2E86AB", // 블루
    "#F9DC5C", // 옐로우
    "#C8A8E9", // 라벤더
    "#97DEFF", // 스카이블루
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-lg">{data.emoji}</span>
            <span className="font-medium text-gray-800">{data.label}</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {data.value}회 ({data.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-500">
            {timeRange === "week" ? "최근 1주일" : "최근 1개월"} 동안의 감정
            기록이 없어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-600">
              {item.emoji} {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
