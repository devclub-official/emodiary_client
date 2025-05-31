"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  emotionEmojis,
  type DiaryEntry,
  type EmotionType,
} from "@/lib/calendar";
import { TrendingUp, BarChart3 } from "lucide-react";

interface EmotionTimelineProps {
  entries: DiaryEntry[];
  timeRange: "week" | "month";
}

export default function EmotionTimeline({
  entries,
  timeRange,
}: EmotionTimelineProps) {
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

  // 감정을 점수로 변환 (4가지 감정 기준)
  const getEmotionScore = (emotion: EmotionType): number => {
    const scores: Record<EmotionType, number> = {
      happy: 3,
      anxious: 2,
      sad: 1,
      angry: 0,
    };
    return scores[emotion];
  };

  function getEmotionLabel(emotion: EmotionType): string {
    const labels: Record<EmotionType, string> = {
      happy: "기쁨",
      sad: "슬픔",
      angry: "화남",
      anxious: "불안",
    };
    return labels[emotion];
  }

  // 차트 데이터 생성
  const chartData = filteredEntries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      date: entry.date,
      score: getEmotionScore(entry.emotion),
      emotion: entry.emotion,
      emoji: emotionEmojis[entry.emotion],
      label: getEmotionLabel(entry.emotion),
      displayDate: new Date(entry.date).toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      }),
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{data.emoji}</span>
            <span className="font-medium text-foreground">{data.label}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {data.displayDate}
          </div>
        </div>
      );
    }
    return null;
  };

  // Y축 틱 커스터마이징 (4단계)
  const formatYTick = (value: number) => {
    const labels = ["😠", "😢", "😰", "😊"];
    return labels[value] || "";
  };

  if (chartData.length === 0) {
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
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="displayDate"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickFormatter={formatYTick}
              stroke="#9ca3af"
              fontSize={14}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "#2563eb" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 감정 점수 설명 */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          감정 레벨 가이드
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span>😊</span>
            <span className="text-foreground">기쁨 (3점)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>😰</span>
            <span className="text-foreground">불안 (2점)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>😢</span>
            <span className="text-foreground">슬픔 (1점)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>😠</span>
            <span className="text-foreground">화남 (0점)</span>
          </div>
        </div>
      </div>

      {/* 추이 분석 */}
      {chartData.length >= 3 && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-foreground">감정 추이 분석</h4>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {(() => {
              const recent = chartData.slice(-3);
              const avgRecent =
                recent.reduce((sum, item) => sum + item.score, 0) /
                recent.length;
              const older = chartData.slice(0, -3);
              const avgOlder =
                older.length > 0
                  ? older.reduce((sum, item) => sum + item.score, 0) /
                    older.length
                  : avgRecent;

              if (avgRecent > avgOlder + 0.5) {
                return "최근 감정 상태가 개선되고 있어요! 좋은 흐름을 유지해보세요.";
              } else if (avgRecent < avgOlder - 0.5) {
                return "최근 조금 힘든 시간을 보내고 계시는군요. 자신을 돌보는 시간을 가져보세요.";
              } else {
                return "안정적인 감정 상태를 유지하고 계세요. 꾸준한 기록이 도움이 되고 있어요.";
              }
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
