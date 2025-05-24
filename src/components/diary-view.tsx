"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Heart } from "lucide-react";
import { emotionEmojis, type DiaryEntry } from "@/lib/calendar";

interface DiaryViewProps {
  entry: DiaryEntry;
  date: string;
  onBack?: () => void;
}

export default function DiaryView({ entry, date, onBack }: DiaryViewProps) {
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;

    return `${ampm} ${displayHours}:${minutes.toString().padStart(2, "0")}`;
  };

  const getEmotionLabel = (emotion: string) => {
    const labels: Record<string, string> = {
      happy: "기쁨",
      sad: "슬픔",
      angry: "화남",
      anxious: "불안",
      excited: "신남",
      calm: "평온",
      confused: "혼란",
      grateful: "감사",
    };
    return labels[emotion] || emotion;
  };

  // Q&A 형식의 내용을 파싱
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const qaList: { question: string; answer: string }[] = [];

    for (let i = 0; i < lines.length; i += 3) {
      const questionLine = lines[i];
      const answerLine = lines[i + 1];

      if (questionLine?.startsWith("Q: ") && answerLine?.startsWith("A: ")) {
        qaList.push({
          question: questionLine.substring(3),
          answer: answerLine.substring(3),
        });
      }
    }

    return qaList.length > 0 ? qaList : null;
  };

  const qaList = parseContent(entry.content);

  return (
    <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0 ring-1 ring-gray-200/50">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="hover:bg-purple-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">
              {formatDisplayDate(date)}
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            {formatCreatedAt(entry.createdAt)}에 작성됨
          </p>
        </div>
      </div>

      {/* 감정 표시 */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-3">{emotionEmojis[entry.emotion]}</div>
            <p className="text-lg font-medium text-gray-700">
              {getEmotionLabel(entry.emotion)}
            </p>
            <p className="text-sm text-gray-500 mt-1">오늘의 감정</p>
          </div>
        </div>
      </div>

      {/* 일기 내용 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-pink-500" />
          <h2 className="text-lg font-semibold text-gray-800">일기 내용</h2>
        </div>

        {qaList ? (
          // Q&A 형식으로 표시
          <div className="space-y-6">
            {qaList.map((qa, index) => (
              <div key={index} className="space-y-3">
                {/* AI 질문 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-800 leading-relaxed">
                        {qa.question}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 사용자 답변 */}
                <div className="flex items-start gap-4 justify-end">
                  <div className="flex-1 max-w-[80%]">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl rounded-tr-none p-4">
                      <p className="text-gray-800 leading-relaxed">
                        {qa.answer}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">나</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 일반 텍스트 형식으로 표시
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
        )}
      </div>

      {/* 하단 안내 */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            💡 작성된 일기는 수정할 수 없어요. 새로운 감정은 오늘 일기에
            기록해보세요!
          </p>
          <Button
            variant="outline"
            onClick={onBack}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            캘린더로 돌아가기
          </Button>
        </div>
      </div>
    </Card>
  );
}
