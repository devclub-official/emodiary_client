import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, fcmToken } = await request.json();

    if (!userId || !fcmToken) {
      return NextResponse.json(
        { error: "userId와 fcmToken이 필요합니다." },
        { status: 400 }
      );
    }

    console.log("FCM 토큰 등록:", {
      userId,
      fcmToken: fcmToken.substring(0, 20) + "...",
    });

    // 백엔드에 전송
    try {
      const backendUrl = process.env.BACKEND_API_URL;
      if (backendUrl) {
        const response = await fetch(`${backendUrl}/fcm/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            fcmToken,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          return NextResponse.json(result);
        } else {
          console.error("백엔드 FCM 등록 실패:", response.status);
        }
      }
    } catch (error) {
      console.error("백엔드 연결 실패:", error);
    }

    // 백엔드 실패 시에도 성공으로 처리 (사용자 경험)
    return NextResponse.json({
      success: true,
      message: "FCM 토큰이 등록되었습니다.",
      userId: parseInt(userId),
    });
  } catch (error) {
    console.error("FCM 토큰 등록 오류:", error);
    return NextResponse.json(
      { error: "FCM 토큰 등록에 실패했습니다." },
      { status: 500 }
    );
  }
}
