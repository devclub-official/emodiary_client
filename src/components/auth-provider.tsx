"use client";

import { useEffect } from "react";
import { initializeAuth } from "@/lib/auth-utils";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    // 앱 초기화 시 쿠키에서 사용자 정보 복원
    initializeAuth();
  }, []);

  return <>{children}</>;
}
