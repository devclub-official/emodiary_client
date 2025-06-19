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

  const { access_token, refresh_token } = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    path: "/",
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    path: "/",
  });

  redirect("/dashboard");
}
