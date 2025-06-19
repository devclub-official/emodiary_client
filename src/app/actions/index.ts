"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "../auth/callback/page";

export async function getUser(currentParams: SearchParams) {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/login/google?${currentParams.toString()}`
  );

  if (!response.ok) {
    if (response.status === 500) {
      redirect("/?loginError=serverError");
    }
  }

  if (response.ok) {
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
}
