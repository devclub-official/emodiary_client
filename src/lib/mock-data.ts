import type { DiaryEntry } from "./calendar";

// 테스트용 더미 일기 데이터 (2025년 5월)
export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: "1",
    date: "2025-05-03",
    emotion: "happy",
    content:
      "주말에 가족들과 함께 시간을 보냈다. 오랜만에 모든 가족이 모여서 정말 행복했다.",
    createdAt: "2025-05-03T21:15:00Z",
  },
  {
    id: "2",
    date: "2025-05-07",
    emotion: "anxious",
    content:
      "다음 주 프레젠테이션 준비로 스트레스를 받고 있다. 잘 할 수 있을까 걱정된다.",
    createdAt: "2025-05-07T19:30:00Z",
  },
  {
    id: "3",
    date: "2025-05-10",
    emotion: "sad",
    content: "비가 와서 기분이 우울했다. 계획했던 외출도 취소되어서 아쉬웠다.",
    createdAt: "2025-05-10T20:00:00Z",
  },
  {
    id: "4",
    date: "2025-05-15",
    emotion: "happy",
    content: "프레젠테이션이 성공적으로 끝났다! 팀원들과 축하 파티를 했다.",
    createdAt: "2025-05-15T21:45:00Z",
  },
  {
    id: "5",
    date: "2025-05-18",
    emotion: "angry",
    content: "오늘 일에서 불합리한 일이 있어서 화가 났다. 스트레스가 쌓인다.",
    createdAt: "2025-05-18T18:45:00Z",
  },
  {
    id: "6",
    date: "2025-05-22",
    emotion: "happy",
    content:
      "친구가 힘들 때 도움을 줘서 고마웠다. 좋은 사람들이 주변에 있어서 감사하다.",
    createdAt: "2025-05-22T21:00:00Z",
  },
  {
    id: "7",
    date: "2025-05-25",
    emotion: "anxious",
    content: "새로운 프로젝트가 시작되는데 잘 해낼 수 있을지 걱정된다.",
    createdAt: "2025-05-25T20:15:00Z",
  },
  {
    id: "8",
    date: "2025-05-28",
    emotion: "sad",
    content: "오늘은 혼자 있는 시간이 길어서 조금 외로웠다.",
    createdAt: "2025-05-28T22:30:00Z",
  },
];

// 더미 데이터 로드 함수
export function loadMockData(): DiaryEntry[] {
  return mockDiaryEntries;
}
