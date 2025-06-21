"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuthStore } from "@/lib/store";
import { clearAuthCookies } from "@/lib/auth-utils";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 호출
      await fetch("/api/auth/logout", { method: "POST" });

      // 전역 상태 정리
      logout();

      // 쿠키 정리
      clearAuthCookies();

      // FCM 토큰도 정리
      localStorage.removeItem("fcm_token");
      localStorage.removeItem("fcm_user_id");

      router.push("/");
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="btn-game h-11 px-4"
    >
      로그아웃
    </Button>
  );
}
