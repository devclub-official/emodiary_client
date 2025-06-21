🔄 작동 플로우:

- 로그인 성공 → 백엔드에서 user 정보 포함하여 응답
- 콜백에서 쿠키 저장 → user_info 쿠키에 사용자 정보 저장
- 앱 초기화 → AuthProvider가 쿠키에서 사용자 정보 읽어서 전역 store 설정
- FCM 등록 → 대시보드에서 user.id 사용하여 FCM 토큰 등록
- 로그아웃 → 전역 상태, 쿠키, FCM 토큰 모두 정리

  📁 핵심 파일들:

- src/lib/store.ts - AuthStore에 persist 추가로 localStorage 저장
- src/lib/auth-utils.ts - 쿠키 읽기/쓰기/정리 유틸리티
- src/components/auth-provider.tsx - 앱 초기화 시 사용자 정보 복원
- src/components/providers.tsx - AuthProvider 추가
- src/app/auth/callback/route.ts - 사용자 정보 쿠키 저장
- src/app/dashboard/page.tsx - 간단한 FCM 등록 로직
- src/components/logout-button.tsx - 완전한 로그아웃 처리
