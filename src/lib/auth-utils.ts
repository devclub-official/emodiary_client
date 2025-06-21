import { useAuthStore } from "./store";

// 쿠키에서 사용자 정보 읽기
export const getUserFromCookie = (): any | null => {
  if (typeof window === "undefined") return null;

  try {
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("user_info=")
    );

    if (userCookie) {
      const userInfo = userCookie.split("=")[1];
      return JSON.parse(decodeURIComponent(userInfo));
    }
  } catch (error) {
    console.error("사용자 정보 쿠키 읽기 실패:", error);
  }

  return null;
};

// 전역 store에 사용자 정보 초기화
export const initializeAuth = () => {
  const userInfo = getUserFromCookie();

  if (userInfo) {
    const { login } = useAuthStore.getState();
    login(userInfo);
    console.log("쿠키에서 사용자 정보 복원:", userInfo);
    return userInfo;
  }

  return null;
};

// 로그아웃 시 쿠키 정리
export const clearAuthCookies = () => {
  if (typeof window === "undefined") return;

  // 사용자 정보 쿠키 삭제
  document.cookie =
    "user_info=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    "refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

  console.log("인증 관련 쿠키 정리 완료");
};
