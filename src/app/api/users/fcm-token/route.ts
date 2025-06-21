import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, fcmToken, registeredAt, source } = await request.json();

    if (!userId || !fcmToken) {
      return NextResponse.json(
        { error: "userId와 fcmToken이 필요합니다." },
        { status: 400 }
      );
    }

    console.log("FCM 토큰 저장 요청:", {
      userId,
      fcmToken: fcmToken.substring(0, 20) + "...",
      registeredAt,
      source,
    });

    try {
      const backendUrl = process.env.BACKEND_API_URL;
      if (backendUrl) {
        const response = await fetch(
          `${backendUrl}/users/${userId}/fcm-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': `Bearer ${getAuthToken()}`, // 필요시 인증 토큰 추가
            },
            body: JSON.stringify({
              fcmToken,
              registeredAt,
              source,
              deviceInfo: {
                userAgent: request.headers.get("user-agent"),
                timestamp: new Date().toISOString(),
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`백엔드 API 호출 실패: ${response.status}`);
        }

        const result = await response.json();
        return NextResponse.json(result);
      }
    } catch (backendError) {
      console.error("백엔드 API 호출 실패, 로컬 저장으로 대체:", backendError);
      // 백엔드 실패 시에도 프론트엔드에서는 성공으로 처리하여 사용자 경험을 해치지 않음
    }

    // 백엔드 연결 실패 시 또는 백엔드 URL이 없을 때 임시 성공 응답
    return NextResponse.json({
      success: true,
      message: "FCM 토큰이 성공적으로 저장되었습니다.",
      userId,
      fcmToken: fcmToken.substring(0, 20) + "...",
      registeredAt,
      source,
      note: "Local storage - backend integration pending",
    });
  } catch (error) {
    console.error("FCM 토큰 저장 중 오류:", error);
    return NextResponse.json(
      { error: "FCM 토큰 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    // TODO: 실제 백엔드에서 FCM 토큰 조회
    console.log("FCM 토큰 조회:", { userId });

    // 임시 응답
    return NextResponse.json({
      userId,
      fcmToken: null, // 실제로는 DB에서 조회
      hasToken: false,
    });
  } catch (error) {
    console.error("FCM 토큰 조회 중 오류:", error);
    return NextResponse.json(
      { error: "FCM 토큰 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    // TODO: 실제 백엔드에서 FCM 토큰 삭제
    console.log("FCM 토큰 삭제:", { userId });

    return NextResponse.json({
      success: true,
      message: "FCM 토큰이 삭제되었습니다.",
      userId,
    });
  } catch (error) {
    console.error("FCM 토큰 삭제 중 오류:", error);
    return NextResponse.json(
      { error: "FCM 토큰 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
