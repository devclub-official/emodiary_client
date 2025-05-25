"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart3,
  Heart,
  TrendingUp,
  Calendar,
  Sparkles,
} from "lucide-react";
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
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="pt-8 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="btn-game h-10 w-10 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-6 h-6 text-foreground" />
                <h1 className="text-3xl font-bold text-foreground">
                  감정 분석
                </h1>
              </div>
              <p className="text-muted-foreground pl-9">
                당신의 감정 패턴을 분석하고 인사이트를 확인하세요
              </p>
            </div>
          </div>

          {/* 기간 선택 */}
          <div className="flex gap-3 pl-9">
            <Button
              size="sm"
              onClick={() => setTimeRange("week")}
              className={timeRange === "week" ? "btn-game" : "btn-secondary"}
            >
              <Calendar className="w-4 h-4 mr-2" />
              최근 1주일
            </Button>
            <Button
              size="sm"
              onClick={() => setTimeRange("month")}
              className={timeRange === "month" ? "btn-game" : "btn-secondary"}
            >
              <Calendar className="w-4 h-4 mr-2" />
              최근 1개월
            </Button>
          </div>
        </div>

        {/* 통계 카드들 */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 card-stat-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                전체 일기
              </h3>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {entries.length}
            </div>
            <p className="text-sm text-muted-foreground">개의 감정 기록</p>
          </Card>

          <Card className="p-6 card-stat-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">이번 달</h3>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
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
            <p className="text-sm text-muted-foreground">개의 새로운 기록</p>
          </Card>

          <Card className="p-6 card-stat-3d">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                연속 기록
              </h3>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">7</div>
            <p className="text-sm text-muted-foreground">일 연속 작성</p>
          </Card>
        </div>

        {/* 차트 섹션 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 감정 분포 차트 */}
          <Card className="p-6 h-[450px] card-3d">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              감정 분포
            </h3>
            <EmotionChart entries={entries} timeRange={timeRange} />
          </Card>

          {/* 감정 통계 */}
          <Card className="p-6 card-3d">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              감정 통계
            </h3>
            <EmotionStats entries={entries} timeRange={timeRange} />
          </Card>
        </div>

        {/* 감정 타임라인 */}
        <Card className="p-6 card-3d">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            감정 타임라인
          </h3>
          <EmotionTimeline entries={entries} timeRange={timeRange} />
        </Card>

        {/* 인사이트 메시지 */}
        <Card className="p-8 bg-muted/30 hero-card-3d">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              당신의 감정 여행
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              매일 기록한 감정들이 모여 당신만의 이야기를 만들어갑니다.
              <br />
              작은 변화들도 소중한 성장의 발걸음이에요
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
