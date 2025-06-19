"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TypeSearchParams } from "../auth/callback/page";

export async function getUser(params: Awaited<TypeSearchParams>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((item) => {
        if (item !== undefined) searchParams.append(k, item);
      });
    } else if (v !== undefined) {
      searchParams.append(k, v);
    }
  });

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/login/google?${searchParams.toString()}`
  );

  console.warn(response);

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
