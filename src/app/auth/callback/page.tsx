import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) {
  const { code } = await searchParams;
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/login/google?code=${code}`
  );

  if (response.ok) {
    const { accessToken, refreshToken } = await response.json();
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
    });

    redirect("/");
  }

  return <div>CallbackPage</div>;
}
