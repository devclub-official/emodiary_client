/**
 * fcm 등록 함수
 */
import { generateFCMToken } from "./firebase";

// 로그인 시 FCM 토큰 등록
export const registerFCMOnLogin = async (userId: number) => {
  try {
    // 브라우저 알림 지원 체크
    if (!("Notification" in window)) {
      console.log("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }

    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("알림 권한이 거부되었습니다.");
      return;
    }

    // FCM 토큰 생성
    const fcmToken = await generateFCMToken();
    if (!fcmToken) {
      console.log("FCM 토큰 생성에 실패했습니다.");
      return;
    }

    // 백엔드에 전송
    const response = await fetch("/api/fcm/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        fcmToken,
      }),
    });

    if (response.ok) {
      console.log("FCM 토큰 등록 성공!");
      // 로컬 스토리지에 저장
      localStorage.setItem("fcm_token", fcmToken);
      localStorage.setItem("fcm_user_id", userId.toString());
    } else {
      console.error("FCM 토큰 등록 실패");
    }
  } catch (error) {
    console.error("FCM 등록 중 오류:", error);
    // FCM 실패가 로그인을 방해하지 않도록 에러를 던지지 않음
  }
};
