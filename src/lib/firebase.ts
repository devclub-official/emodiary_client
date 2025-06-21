import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// FCM 메시징 초기화 (클라이언트 사이드에서만)
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

// VAPID 키 (Firebase Console에서 생성)
const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// FCM 토큰 생성
export const generateFCMToken = async (): Promise<string | null> => {
  if (!messaging || !vapidKey) {
    console.error("FCM 설정이 올바르지 않습니다.");
    return null;
  }

  try {
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      console.log("FCM 토큰 생성 성공:", token);
      return token;
    } else {
      console.log("FCM 토큰 생성 실패 - 알림 권한을 확인해주세요.");
      return null;
    }
  } catch (error) {
    console.error("FCM 토큰 생성 중 오류:", error);
    return null;
  }
};

// 포그라운드 메시지 수신 핸들러
export const onForegroundMessage = (callback: (payload: any) => void) => {
  if (!messaging) return;

  return onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);
    callback(payload);
  });
};

export default app;
