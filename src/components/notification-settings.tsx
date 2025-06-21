"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import { useFCM } from "@/hooks/useFCM";

export default function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState("20:00");
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isLoading, setIsLoading] = useState(false);

  // FCM 훅 사용
  const {
    token,
    isLoading: fcmLoading,
    error: fcmError,
    requestFCMToken,
    hasFCMToken,
  } = useFCM();

  // 브라우저 알림 권한 상태 확인
  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // 알림 권한 요청
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }

    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        setNotificationsEnabled(true);
        // 테스트 알림 보내기
        new Notification("마음의 날씨", {
          body: "알림이 성공적으로 설정되었습니다! 🎉",
          icon: "/favicon.ico",
        });
      }
    } catch (error) {
      console.error("알림 권한 요청 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 알림 토글 핸들러
  const handleNotificationToggle = async (checked: boolean) => {
    if (checked && permission !== "granted") {
      await requestNotificationPermission();
    }

    if (checked && permission === "granted" && !hasFCMToken) {
      // FCM 토큰 생성 및 백엔드 저장
      await requestFCMToken();
    }

    setNotificationsEnabled(checked);
  };

  // 시간 변경 핸들러
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationTime(e.target.value);
  };

  // 테스트 알림 보내기
  const sendTestNotification = () => {
    if (permission === "granted") {
      new Notification("마음의 날씨", {
        body: "오늘의 감정을 기록해보세요! ✨",
        icon: "/favicon.ico",
      });
    }
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case "granted":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          text: "허용됨",
          color: "text-green-600",
        };
      case "denied":
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
          text: "차단됨",
          color: "text-red-600",
        };
      default:
        return {
          icon: <Shield className="w-4 h-4 text-gray-500" />,
          text: "설정되지 않음",
          color: "text-gray-600",
        };
    }
  };

  const permissionStatus = getPermissionStatus();

  return (
    <div className="space-y-6">
      {/* 브라우저 알림 권한 상태 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              브라우저 알림 권한
            </span>
          </div>
          <div className={`flex items-center gap-1 ${permissionStatus.color}`}>
            {permissionStatus.icon}
            <span className="text-xs font-medium">{permissionStatus.text}</span>
          </div>
        </div>

        {permission !== "granted" && (
          <Button
            onClick={requestNotificationPermission}
            disabled={isLoading || permission === "denied"}
            size="sm"
            className="w-full btn-game"
          >
            {isLoading ? "요청 중..." : "알림 권한 요청"}
          </Button>
        )}

        {permission === "denied" && (
          <div className="text-xs text-muted-foreground mt-2">
            브라우저 설정에서 알림을 허용해주세요.
          </div>
        )}
      </div>

      {/* FCM 토큰 상태 */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              푸시 알림 토큰
            </span>
          </div>
          <div
            className={`flex items-center gap-1 ${
              hasFCMToken ? "text-green-600" : "text-gray-600"
            }`}
          >
            {hasFCMToken ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-gray-500" />
            )}
            <span className="text-xs font-medium">
              {hasFCMToken ? "등록됨" : "미등록"}
            </span>
          </div>
        </div>

        {fcmError && (
          <div className="text-xs text-red-600 mb-2">오류: {fcmError}</div>
        )}

        {!hasFCMToken && permission === "granted" && (
          <Button
            onClick={requestFCMToken}
            disabled={fcmLoading}
            size="sm"
            className="w-full btn-game"
          >
            {fcmLoading ? "토큰 생성 중..." : "푸시 알림 설정"}
          </Button>
        )}

        {token && (
          <div className="text-xs text-muted-foreground mt-2">
            토큰: {token.substring(0, 20)}...
          </div>
        )}
      </div>

      {/* 알림 활성화 토글 */}
      <div className="flex items-center justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              일기 작성 알림
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            매일 설정한 시간에 일기 작성을 알려드려요
          </p>
        </div>
        <Switch
          checked={
            notificationsEnabled && permission === "granted" && hasFCMToken
          }
          onCheckedChange={handleNotificationToggle}
          disabled={permission !== "granted" || fcmLoading}
        />
      </div>

      {/* 알림 시간 설정 */}
      {notificationsEnabled && permission === "granted" && hasFCMToken && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              알림 시간
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="time"
              value={notificationTime}
              onChange={handleTimeChange}
              className="flex-1 p-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400   text-foreground input-game"
            />
            <Button
              onClick={sendTestNotification}
              size="sm"
              variant="default"
              className="btn-secondary"
            >
              테스트
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            매일 {notificationTime}에 알림을 받게 됩니다
          </p>
        </div>
      )}

      {/* 알림 설명 */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-lg">💡</div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              알림 기능 안내
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• 매일 설정한 시간에 일기 작성을 알려드려요</li>
              <li>• 연속 기록을 놓치지 않도록 도와드려요</li>
              <li>• 감정 기록 습관을 만들어보세요</li>
              <li>• 언제든 설정에서 알림을 끄실 수 있어요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
