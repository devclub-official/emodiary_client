"use server";

export type AuthProvider = "google" | "kakao";

// OAuth 로그인 처리 함수
export const handleOAuthLogin = async (provider: AuthProvider) => {
  try {
    if (provider === "google") {
      const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;

      return GOOGLE_AUTH_URL;
    }

    return null;
  } catch (error) {
    console.error(`${provider} 로그인 오류:`, error);
    return {
      success: false,
      error: `${provider} 로그인에 실패했습니다.`,
    };
  }
};

// 로그아웃 처리 함수
export const handleLogout = async (): Promise<void> => {};
