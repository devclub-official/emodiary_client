// Firebase 메시징 서비스 워커
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

// Firebase 설정 (실제 Firebase 프로젝트 설정으로 변경 필요)
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-actual-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-actual-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// FCM 메시징 초기화
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);

  const notificationTitle = payload.notification?.title || "마음의 날씨";
  const notificationOptions = {
    body: payload.notification?.body || "새로운 알림이 있습니다.",
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    tag: "emodiary-notification",
    requireInteraction: true,
    actions: [
      {
        action: "open",
        title: "열기",
        icon: "/icon-192x192.png",
      },
      {
        action: "close",
        title: "닫기",
      },
    ],
    data: {
      url: payload.data?.url || "/",
      ...payload.data,
    },
  };

  // 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", (event) => {
  console.log("알림 클릭:", event);

  event.notification.close();

  if (event.action === "close") {
    return;
  }

  // 앱 열기
  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // 이미 열린 탭이 있으면 포커스
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }

        // 없으면 새 탭 열기
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// 알림 닫기 이벤트 처리
self.addEventListener("notificationclose", (event) => {
  console.log("알림 닫기:", event);

  // 알림 닫기 이벤트 트래킹 등 필요한 작업 수행
});
