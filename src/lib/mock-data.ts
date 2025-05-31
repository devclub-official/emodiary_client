import type { DiaryEntry } from "./calendar";

// 테스트용 더미 일기 데이터 (2025년 5월)
export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: "1",
    date: "2025-05-01",
    emotion: "excited",
    content:
      "5월의 첫날! 새로운 달이 시작되어서 기분이 좋다. 오늘은 친구들과 피크닉을 갔다.",
    createdAt: "2025-05-01T20:30:00Z",
  },
  {
    id: "2",
    date: "2025-05-03",
    emotion: "happy",
    content:
      "주말에 가족들과 함께 시간을 보냈다. 오랜만에 모든 가족이 모여서 정말 행복했다.",
    createdAt: "2025-05-03T21:15:00Z",
  },
  {
    id: "3",
    date: "2025-05-05",
    emotion: "grateful",
    content:
      "어린이날이라 조카들과 놀아줬다. 아이들의 순수한 웃음을 보니 감사한 마음이 든다.",
    createdAt: "2025-05-05T22:45:00Z",
  },
  {
    id: "4",
    date: "2025-05-07",
    emotion: "calm",
    content:
      "조용한 하루였다. 책을 읽으며 여유로운 시간을 보냈다. 마음이 평온하다.",
    createdAt: "2025-05-07T23:20:00Z",
  },
  {
    id: "5",
    date: "2025-05-10",
    emotion: "anxious",
    content:
      "다음 주 프레젠테이션 준비로 스트레스를 받고 있다. 잘 할 수 있을까 걱정된다.",
    createdAt: "2025-05-10T19:30:00Z",
  },
  {
    id: "6",
    date: "2025-05-12",
    emotion: "sad",
    content: "비가 와서 기분이 우울했다. 계획했던 외출도 취소되어서 아쉬웠다.",
    createdAt: "2025-05-12T20:00:00Z",
  },
  {
    id: "7",
    date: "2025-05-15",
    emotion: "happy",
    content: "프레젠테이션이 성공적으로 끝났다! 팀원들과 축하 파티를 했다.",
    createdAt: "2025-05-15T21:45:00Z",
  },
  {
    id: "8",
    date: "2025-05-18",
    emotion: "confused",
    content: "인생의 방향에 대해 고민이 많다. 어떤 선택을 해야 할지 모르겠다.",
    createdAt: "2025-05-18T22:30:00Z",
  },
  {
    id: "9",
    date: "2025-05-20",
    emotion: "excited",
    content: "새로운 취미를 시작했다! 요가 클래스에 등록했는데 정말 재미있다.",
    createdAt: "2025-05-20T20:15:00Z",
  },
  {
    id: "10",
    date: "2025-05-22",
    emotion: "grateful",
    content:
      "친구가 힘들 때 도움을 줘서 고마웠다. 좋은 사람들이 주변에 있어서 감사하다.",
    createdAt: "2025-05-22T21:00:00Z",
  },
  {
    id: "11",
    date: "2025-05-25",
    emotion: "calm",
    content: "주말 아침, 커피를 마시며 창밖을 바라보는 시간이 평화롭다.",
    createdAt: "2025-05-25T09:30:00Z",
  },
  {
    id: "12",
    date: "2025-05-27",
    emotion: "angry",
    content: "오늘 일에서 불합리한 일이 있어서 화가 났다. 스트레스가 쌓인다.",
    createdAt: "2025-05-27T18:45:00Z",
  },
];

// 더미 데이터 로드 함수
export function loadMockData(): DiaryEntry[] {
  return mockDiaryEntries;
}
