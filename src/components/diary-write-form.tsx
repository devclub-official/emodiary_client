"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Send,
  Sparkles,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import {
  createQuestionSession,
  getNextQuestion,
  saveAnswerAndNext,
  combineAnswersToContent,
  type QuestionSession,
} from "@/lib/ai-questions";
import { useDiaryStore } from "@/lib/store";
import { emotionEmojis, type EmotionType } from "@/lib/calendar";

interface DiaryWriteFormProps {
  date: string;
  onBack?: () => void;
}

export default function DiaryWriteForm({ date, onBack }: DiaryWriteFormProps) {
  const router = useRouter();
  const { addEntry } = useDiaryStore();

  const [session, setSession] = useState<QuestionSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(
    null
  );

  // 세션 초기화
  useEffect(() => {
    const newSession = createQuestionSession(date);
    setSession(newSession);
  }, [date]);

  const currentQuestion = session ? getNextQuestion(session) : null;
  const progress = session
    ? (session.currentQuestionIndex / session.questions.length) * 100
    : 0;

  const handleAnswerSubmit = () => {
    if (!session || !currentQuestion || !currentAnswer.trim()) return;

    const updatedSession = saveAnswerAndNext(
      session,
      currentQuestion.id,
      currentAnswer.trim()
    );
    setSession(updatedSession);
    setCurrentAnswer("");

    // 마지막 질문이면 감정 선택 단계로
    if (updatedSession.isCompleted) {
      // 감정 선택 단계는 별도 처리
    }
  };

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const handleSaveDiary = async () => {
    if (!session || !selectedEmotion) return;

    setIsLoading(true);

    try {
      // TODO: 백엔드에 일기 저장 API 호출
      // const response = await fetch('/api/diary', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     date: session.date,
      //     content: combineAnswersToContent(session),
      //     emotion: selectedEmotion,
      //     answers: session.answers,
      //   }),
      // });
      // const savedEntry = await response.json();

      // 임시로 로컬 스토어에 저장
      const newEntry = {
        id: `diary_${Date.now()}`,
        date: session.date,
        content: combineAnswersToContent(session),
        emotion: selectedEmotion,
        createdAt: new Date().toISOString(),
      };

      addEntry(newEntry);

      // 대시보드로 이동
      router.push("/dashboard");
    } catch (error) {
      console.error("일기 저장 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnswerSubmit();
    }
  };

  // 감정별 버튼 스타일 결정
  const getEmotionButtonClass = (emotion: EmotionType, isSelected: boolean) => {
    const baseClass =
      "p-4 rounded-xl font-bold transition-all duration-200 relative";

    if (isSelected) {
      switch (emotion) {
        case "happy":
          return `${baseClass} btn-calendar-happy`;
        case "sad":
          return `${baseClass} btn-calendar-sad`;
        case "angry":
          return `${baseClass} btn-calendar-angry`;
        case "anxious":
          return `${baseClass} btn-calendar-anxious`;
        default:
          return `${baseClass} btn-calendar-default`;
      }
    }

    return `${baseClass} btn-calendar-default hover:scale-105`;
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-foreground mx-auto mb-2 animate-spin" />
          <p className="text-muted-foreground">
            AI가 질문을 준비하고 있어요...
          </p>
        </div>
      </div>
    );
  }

  // 감정 선택 단계
  if (session.isCompleted && !selectedEmotion) {
    return (
      <Card className="p-8 card-3d">
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 text-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            훌륭해요! 마지막 단계예요
          </h2>
          <p className="text-muted-foreground">
            오늘 하루를 대표하는 감정을 선택해주세요
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(emotionEmojis).map(([emotion, emoji]) => (
            <button
              key={emotion}
              onClick={() => handleEmotionSelect(emotion as EmotionType)}
              className={getEmotionButtonClass(
                emotion as EmotionType,
                selectedEmotion === emotion
              )}
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="text-xs font-medium">
                {emotion === "happy" && "기쁨"}
                {emotion === "sad" && "슬픔"}
                {emotion === "angry" && "화남"}
                {emotion === "anxious" && "불안"}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="btn-secondary flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          <Button
            onClick={handleSaveDiary}
            disabled={!selectedEmotion || isLoading}
            className="btn-game flex-1"
          >
            {isLoading ? "저장 중..." : "일기 저장하기"}
          </Button>
        </div>
      </Card>
    );
  }

  // 완료 후 감정이 선택된 상태
  if (session.isCompleted && selectedEmotion) {
    return (
      <Card className="p-8 hero-card-3d">
        <div className="text-center">
          <div className="text-6xl mb-4">{emotionEmojis[selectedEmotion]}</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            일기가 저장되었어요!
          </h2>
          <p className="text-muted-foreground mb-6">
            오늘도 소중한 하루를 기록해주셔서 감사해요
          </p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="btn-game"
          >
            대시보드로 돌아가기
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 card-3d">
      {/* 진행률 표시 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              질문 {session.currentQuestionIndex + 1} /{" "}
              {session.questions.length}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% 완료
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 progress-bar">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* AI 질문 */}
      {currentQuestion && (
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-accent/50 rounded-2xl rounded-tl-none p-4">
                <p className="text-foreground leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 답변 입력 */}
      <div className="space-y-4">
        <Textarea
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="여기에 답변을 작성해주세요... (Enter로 전송, Shift+Enter로 줄바꿈)"
          className="min-h-[120px] resize-none input-game"
        />

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="btn-secondary flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          <Button
            onClick={handleAnswerSubmit}
            disabled={!currentAnswer.trim()}
            className="btn-game flex-1"
          >
            <Send className="w-4 h-4 mr-2" />
            답변 전송
          </Button>
        </div>
      </div>

      {/* 이전 답변들 미리보기 */}
      {Object.keys(session.answers).length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm font-medium text-foreground">완료된 답변</p>
          </div>
          <div className="space-y-3 max-h-32 overflow-y-auto">
            {session.questions
              .slice(0, session.currentQuestionIndex)
              .map((q) => {
                const answer = session.answers[q.id];
                return answer ? (
                  <div
                    key={q.id}
                    className="text-xs bg-muted/50 p-3 rounded-xl border border-border"
                  >
                    <span className="font-medium text-foreground">
                      {q.question}
                    </span>
                    <br />
                    <span className="text-muted-foreground">{answer}</span>
                  </div>
                ) : null;
              })}
          </div>
        </div>
      )}
    </Card>
  );
}
