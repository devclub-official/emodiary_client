import { useAuthStore } from "./store";

export type AuthProvider = "google" | "naver" | "kakao";

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    provider: AuthProvider;
  };
  error?: string;
}

// OAuth 로그인 처리 함수
export const handleOAuthLogin = async (
  provider: AuthProvider
): Promise<AuthResponse> => {
  const { setLoading } = useAuthStore.getState();

  try {
    setLoading(true);

    // TODO: 실제 OAuth 인증 로직 구현
    // 1. 해당 provider의 OAuth URL로 리디렉션
    // 2. 콜백에서 인증 코드 받기
    // 3. 백엔드에 인증 코드 전달하여 토큰 교환
    // 4. 사용자 정보 받아오기

    // 임시 시뮬레이션 (실제 구현 시 제거)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = {
      id: `${provider}_user_123`,
      email: `user@${provider}.com`,
      name: `${provider} 사용자`,
      provider,
    };

    return {
      success: true,
      user: mockUser,
    };
  } catch (error) {
    console.error(`${provider} 로그인 오류:`, error);
    return {
      success: false,
      error: `${provider} 로그인에 실패했습니다.`,
    };
  } finally {
    setLoading(false);
  }
};

// OAuth 회원가입 처리 함수
export const handleOAuthSignup = async (
  provider: AuthProvider
): Promise<AuthResponse> => {
  const { setLoading } = useAuthStore.getState();

  try {
    setLoading(true);

    // TODO: 실제 OAuth 회원가입 로직 구현
    // 1. 해당 provider의 OAuth URL로 리디렉션
    // 2. 콜백에서 인증 코드 받기
    // 3. 백엔드에 회원가입 요청 (인증 코드 포함)
    // 4. 사용자 정보 받아오기

    // 임시 시뮬레이션 (실제 구현 시 제거)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = {
      id: `${provider}_new_user_123`,
      email: `newuser@${provider}.com`,
      name: `새로운 ${provider} 사용자`,
      provider,
    };

    return {
      success: true,
      user: mockUser,
    };
  } catch (error) {
    console.error(`${provider} 회원가입 오류:`, error);
    return {
      success: false,
      error: `${provider} 회원가입에 실패했습니다.`,
    };
  } finally {
    setLoading(false);
  }
};

// 로그아웃 처리 함수
export const handleLogout = async (): Promise<void> => {
  const { logout } = useAuthStore.getState();

  try {
    // TODO: 백엔드에 로그아웃 요청
    // 1. 토큰 무효화 요청
    // 2. 로컬 스토리지 정리

    logout();
  } catch (error) {
    console.error("로그아웃 오류:", error);
    // 에러가 발생해도 로컬 상태는 정리
    logout();
  }
};
