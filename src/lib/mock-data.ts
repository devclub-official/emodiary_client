import type { DiaryEntry } from "./calendar";

// 테스트용 더미 일기 데이터
export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: "1",
    date: "2024-12-15",
    emotion: "happy",
    content:
      "오늘은 정말 좋은 하루였다. 새로운 프로젝트를 시작했는데 팀원들과 잘 맞는 것 같다.",
    createdAt: "2024-12-15T20:30:00Z",
  },
  {
    id: "2",
    date: "2024-12-14",
    emotion: "calm",
    content: "평온한 하루. 책을 읽으며 여유로운 시간을 보냈다.",
    createdAt: "2024-12-14T21:15:00Z",
  },
  {
    id: "3",
    date: "2024-12-13",
    emotion: "anxious",
    content: "내일 발표가 걱정된다. 준비는 다 했지만 떨린다.",
    createdAt: "2024-12-13T22:45:00Z",
  },
  {
    id: "4",
    date: "2024-12-12",
    emotion: "excited",
    content: "친구들과 만나서 정말 즐거웠다! 오랜만에 웃었다.",
    createdAt: "2024-12-12T23:20:00Z",
  },
  {
    id: "5",
    date: "2024-12-11",
    emotion: "grateful",
    content: "가족들과 함께한 시간이 소중했다. 감사한 마음이 든다.",
    createdAt: "2024-12-11T19:30:00Z",
  },
  {
    id: "6",
    date: "2024-12-10",
    emotion: "sad",
    content: "힘든 하루였다. 일이 잘 안 풀렸다.",
    createdAt: "2024-12-10T20:00:00Z",
  },
  {
    id: "7",
    date: "2024-12-09",
    emotion: "confused",
    content: "앞으로 어떻게 해야 할지 모르겠다. 고민이 많다.",
    createdAt: "2024-12-09T21:45:00Z",
  },
];

// 더미 데이터 로드 함수
export function loadMockData(): DiaryEntry[] {
  return mockDiaryEntries;
}
