import { useState, useEffect } from "react";
import { generateFCMToken, onForegroundMessage } from "@/lib/firebase";
import { useAuthStore } from "@/lib/store";
import { toast } from "sonner";

interface FCMState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useFCM = () => {
  const [fcmState, setFCMState] = useState<FCMState>({
    token: null,
    isLoading: false,
    error: null,
  });
  const { user } = useAuthStore();

  // FCM 토큰 생성 및 백엔드 저장
  const requestFCMToken = async () => {
    if (!user?.id) {
      setFCMState((prev) => ({ ...prev, error: "로그인이 필요합니다." }));
      return;
    }

    setFCMState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // 브라우저 알림 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("알림 권한이 거부되었습니다.");
      }

      // FCM 토큰 생성
      const token = await generateFCMToken();
      if (!token) {
        throw new Error("FCM 토큰 생성에 실패했습니다.");
      }

      // 백엔드에 토큰 저장
      await saveFCMTokenToBackend(user.id, token);

      setFCMState((prev) => ({ ...prev, token, isLoading: false }));

      // 로컬 스토리지에도 저장
      localStorage.setItem("fcm_token", token);

      toast.success("알림 설정이 완료되었습니다!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      setFCMState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      toast.error(`알림 설정 실패: ${errorMessage}`);
    }
  };

  // 백엔드에 FCM 토큰 저장
  const saveFCMTokenToBackend = async (userId: string, fcmToken: string) => {
    const response = await fetch("/api/fcm/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        fcmToken,
      }),
    });

    if (!response.ok) {
      throw new Error("FCM 토큰 저장에 실패했습니다.");
    }

    return await response.json();
  };

  // 저장된 FCM 토큰 로드
  const loadSavedToken = () => {
    const savedToken = localStorage.getItem("fcm_token");
    if (savedToken) {
      setFCMState((prev) => ({ ...prev, token: savedToken }));
    }
  };

  // 포그라운드 메시지 처리
  const setupForegroundListener = () => {
    const unsubscribe = onForegroundMessage((payload) => {
      // 포그라운드에서 메시지 수신 시 처리
      const { notification } = payload;
      if (notification) {
        toast(notification.title || "새 알림", {
          description: notification.body,
        });
      }
    });

    return unsubscribe;
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    loadSavedToken();
    const unsubscribe = setupForegroundListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    ...fcmState,
    requestFCMToken,
    hasFCMToken: !!fcmState.token,
  };
};
