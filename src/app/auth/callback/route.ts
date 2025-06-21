import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/login/google?${searchParams.toString()}`
  );

  if (!response.ok) {
    if (response.status === 500) {
      redirect("/?loginError=serverError");
    }

    if (response.status === 400) {
      redirect("/?loginError=invalidRequest");
    }

    redirect("/?loginError=unknown");
  }

  const { access_token, refresh_token, user } = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    path: "/",
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    path: "/",
  });

  // 사용자 정보를 쿠키에 저장 (보안상 민감하지 않은 정보만)
  if (user) {
    cookieStore.set(
      "user_info",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        provider: "google", // 또는 동적으로 설정
      }),
      {
        httpOnly: false, // 클라이언트에서 접근 가능하도록
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30일
      }
    );
  }

  redirect("/dashboard?login=success");
}
