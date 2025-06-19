"use server";

import { cookies } from "next/headers";
import { TypeSearchParams } from "../auth/callback/page";

export const getUser = async (params: Awaited<TypeSearchParams>) => {
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

  if (!response.ok) {
    if (response.status === 500) {
      return {
        status: response.status,
        message: "서버 오류가 발생했습니다.",
      };
    }

    if (response.status === 400) {
      return {
        status: response.status,
        message: "잘못된 요청입니다.",
      };
    }

    return {
      status: response.status,
      message: "알 수 없는 서버 에러가 발생했습니다.",
    };
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

  return {
    status: response.status,
    message: "로그인에 성공했습니다.",
  };
};
