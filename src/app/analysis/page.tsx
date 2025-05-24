"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Heart, TrendingUp } from "lucide-react";
import { useDiaryStore } from "@/lib/store";
import EmotionChart from "@/components/emotion-chart";
import EmotionStats from "@/components/emotion-stats";
import EmotionTimeline from "@/components/emotion-timeline";

export default function AnalysisPage() {
  const router = useRouter();
  const { entries } = useDiaryStore();
  const [timeRange, setTimeRange] = useState<"week" | "month">("month");

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="pt-8 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                감정 분석
              </h1>
              <p className="text-gray-600">
                당신의 감정 패턴을 분석하고 인사이트를 확인하세요
              </p>
            </div>
          </div>

          {/* 기간 선택 */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={timeRange === "week" ? "default" : "outline"}
              onClick={() => setTimeRange("week")}
              className={
                timeRange === "week"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  : "border-purple-200 text-purple-600 hover:bg-purple-50"
              }
            >
              최근 1주일
            </Button>
            <Button
              size="sm"
              variant={timeRange === "month" ? "default" : "outline"}
              onClick={() => setTimeRange("month")}
              className={
                timeRange === "month"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  : "border-purple-200 text-purple-600 hover:bg-purple-50"
              }
            >
              최근 1개월
            </Button>
          </div>
        </div>

        {/* 통계 카드들 */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold text-gray-800">전체 일기</h3>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {entries.length}
            </div>
            <p className="text-sm text-gray-600">개의 감정 기록</p>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">이번 달</h3>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {
                entries.filter((entry) => {
                  const entryDate = new Date(entry.date);
                  const now = new Date();
                  return (
                    entryDate.getMonth() === now.getMonth() &&
                    entryDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
            <p className="text-sm text-gray-600">개의 새로운 기록</p>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800">연속 기록</h3>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">7</div>
            <p className="text-sm text-gray-600">일 연속 작성</p>
          </Card>
        </div>

        {/* 차트 섹션 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 감정 분포 차트 */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              감정 분포
            </h3>
            <EmotionChart entries={entries} timeRange={timeRange} />
          </Card>

          {/* 감정 통계 */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              감정 통계
            </h3>
            <EmotionStats entries={entries} timeRange={timeRange} />
          </Card>
        </div>

        {/* 감정 타임라인 */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            감정 타임라인
          </h3>
          <EmotionTimeline entries={entries} timeRange={timeRange} />
        </Card>

        {/* 인사이트 메시지 */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-purple-200/50">
          <div className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              당신의 감정 여행
            </h3>
            <p className="text-gray-600 leading-relaxed">
              매일 기록한 감정들이 모여 당신만의 이야기를 만들어갑니다.
              <br />
              작은 변화들도 소중한 성장의 발걸음이에요 💝
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
