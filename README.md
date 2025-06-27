# emodiary_client
## 📌 프로젝트 개요
> 이 프로젝트는 어려운 일기쓰기의 작성을 돕기 위해 개발되었습니다.
> 일기 작성과 AI를 통한 감정 분석을 제공하며, 감정 플로우 분석에 활용될 수 있습니다.
>
> - **개발 기간**: 2025.04.02 ~ 2025.06.27
> - **참여 인원**: 2명
> - **배포 URL**: [배포 링크 또는 '미정']

## 🚀 기술 스택

| 항목               | 기술                                          |
| ------------------ | --------------------------------------------- |
| 프레임워크         | Next.js                                       |
| UI 라이브러리      | shadcn/ui                                     |
| 스타일링           | Tailwind CSS                                  |
| 애니메이션         | Framer Motion (감정 캐릭터 애니메이션용)      |
| 언어               | TypeScript                                    |
| 패키지 매니저      | Bun                                           |
| Linter & Formatter | Biome _(ESLint + Prettier 대체)_              |
| 상태관리           | TanStack Query, react-hook-form, zod, Zustand |

<br>

## 👥 팀원 소개

| 이름   | 역할            | GitHub                           |
| ------ | --------------- | -------------------------------- |
| 강노아 | 프론트엔드 개발 | [@Knoa0405](https://github.com/Knoa0405) |
| 이미연 | 프론트엔드 개발     | [@iammiori](https://github.com/iammiori) |

<br>

## 📂 프로젝트 구조

```plaintext
/project-root
 ├── src/               # 소스 코드 디렉토리
 │   ├── components/    # 재사용 가능한 UI 컴포넌트
 │   ├── pages/         # 페이지 단위 컴포넌트
 │   ├── hooks/         # 커스텀 훅
 │   ├── store/         # 상태 관리 관련 코드
 │   ├── utils/         # 유틸리티 함수
 │   ├── assets/        # 이미지 및 정적 파일
 │   ├── styles/        # 전역 스타일 파일
 │   └── index.tsx      # 진입점 파일
 ├── public/            # 정적 파일 및 HTML 템플릿
 ├── package.json       # 프로젝트 설정 및 의존성 정보
 ├── README.md          # 프로젝트 문서
 └── ...
```


## 🤝 협업 방식 및 병합 방법

### 브랜치 전략

- `main` : 안정적인 배포 버전
- `develop` : 개발 브랜치
- `feature/{기능명}` : 새로운 기능 개발
- `hotfix/{수정명}` : 긴급 수정 사항
- `refactor/{수정명}` : 리팩토링

## 🔧 설치 및 실행 방법

### 1. 필수 요구사항

- Node.js vXX.X.X 이상 (웹의 경우)
- Xcode / Android Studio (iOS/Android의 경우)

### 2. 설치

```sh
# 패키지 설치
npm install   # 또는 yarn install, pnpm install
```

### 3. 개발 서버 실행

```sh
npm run dev   # 또는 yarn dev, pnpm dev
```

### 4. 프로덕션 빌드

```sh
npm run build   # 또는 yarn build, pnpm build
```

<br>

## 🌟 주요 기능

- ✅ [기능 1]: SNS 로그인
- ✅ [기능 2]: 채팅을 통한 일기 작성 및 ai를 통한 감정 분석
- ✅ [기능 3]: 작성한 일기를 바탕으로 감정 플로우 분석
- ✅ [기능 4]: 알림 시스템

<br>

## 🛠️ 환경 변수 설정

`.env` 파일을 생성하고 아래 값을 입력하세요.

```
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
```

<br>


### 병합 방법

1. 이슈를 확인하고 원하는 기능을 선택합니다.
2. 새로운 브랜치를 생성합니다.

```sh
git checkout -b feature/new-feature
```

3. 코드를 작성하고 커밋합니다.

```sh
git commit -m "✨ 새로운 기능 추가"
```

4. 원격 저장소에 푸시하고 PR을 생성합니다.

```sh
git push origin feature/new-feature
```

5. 코드 리뷰 후 `develop` 브랜치에 병합합니다.

<br>

## 📝 라이선스

이 프로젝트는 `000 License`를 따릅니다.

<br>

## 📞 문의 및 지원

- 프로젝트 관련 문의: [your-email@example.com](mailto:your-email@example.com)
- GitHub Issues에 이슈 등록
