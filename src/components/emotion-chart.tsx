"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  emotionEmojis,
  type DiaryEntry,
  type EmotionType,
} from "@/lib/calendar";
import { BarChart3 } from "lucide-react";

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
    };
    return labels[emotion];
  }

  // 감정별 색상 (차트용)
  const colors: Record<string, string> = {
    happy: "#fbbf24", // 노란색
    sad: "#60a5fa", // 파란색
    angry: "#f87171", // 빨간색
    anxious: "#a78bfa", // 보라색
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{data.emoji}</span>
            <span className="font-medium text-foreground">{data.label}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
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
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
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
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={colors[entry.name] || "#9ca3af"}
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
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[item.name] || "#9ca3af" }}
            />
            <span className="text-sm text-foreground">
              {item.emoji} {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
