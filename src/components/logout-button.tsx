"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
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
