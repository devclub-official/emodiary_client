// AI 질문 타입 정의
export interface AIQuestion {
  id: string;
  question: string;
  category: "opening" | "emotion" | "event" | "reflection" | "closing";
  order: number;
}

// AI 질문-답변 세션 타입
export interface QuestionSession {
  id: string;
  date: string;
  currentQuestionIndex: number;
  questions: AIQuestion[];
  answers: Record<string, string>;
  isCompleted: boolean;
}

// 기본 AI 질문 리스트
export const defaultAIQuestions: AIQuestion[] = [
  {
    id: "q1",
    question: "안녕하세요! 오늘 하루는 어떠셨나요?",
    category: "opening",
    order: 1,
  },
  {
    id: "q2",
    question: "오늘 가장 기억에 남는 일이 있다면 무엇인가요?",
    category: "event",
    order: 2,
  },
  {
    id: "q3",
    question: "그 일을 겪으면서 어떤 감정을 느끼셨나요?",
    category: "emotion",
    order: 3,
  },
  {
    id: "q4",
    question: "오늘 하루 중 가장 힘들었던 순간이 있었나요?",
    category: "event",
    order: 4,
  },
  {
    id: "q5",
    question: "그 순간을 어떻게 극복하셨나요?",
    category: "reflection",
    order: 5,
  },
  {
    id: "q6",
    question: "오늘 하루 중 감사했던 일이 있다면 무엇인가요?",
    category: "reflection",
    order: 6,
  },
  {
    id: "q7",
    question: "내일은 어떤 하루가 되었으면 좋겠나요?",
    category: "closing",
    order: 7,
  },
];

// 새로운 질문 세션 생성
export function createQuestionSession(date: string): QuestionSession {
  return {
    id: `session_${date}_${Date.now()}`,
    date,
    currentQuestionIndex: 0,
    questions: [...defaultAIQuestions],
    answers: {},
    isCompleted: false,
  };
}

// 다음 질문 가져오기
export function getNextQuestion(session: QuestionSession): AIQuestion | null {
  if (session.currentQuestionIndex >= session.questions.length) {
    return null;
  }
  return session.questions[session.currentQuestionIndex];
}

// 답변 저장 및 다음 질문으로 이동
export function saveAnswerAndNext(
  session: QuestionSession,
  questionId: string,
  answer: string
): QuestionSession {
  const updatedSession = {
    ...session,
    answers: {
      ...session.answers,
      [questionId]: answer,
    },
    currentQuestionIndex: session.currentQuestionIndex + 1,
  };

  // 모든 질문이 완료되었는지 확인
  if (updatedSession.currentQuestionIndex >= updatedSession.questions.length) {
    updatedSession.isCompleted = true;
  }

  return updatedSession;
}

// 답변들을 하나의 일기 내용으로 합치기
export function combineAnswersToContent(session: QuestionSession): string {
  const answers = session.answers;
  const content = session.questions
    .map((q) => {
      const answer = answers[q.id];
      return answer ? `Q: ${q.question}\nA: ${answer}\n` : "";
    })
    .filter(Boolean)
    .join("\n");

  return content;
}
