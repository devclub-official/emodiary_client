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

    redirect("/");
  }

  return <div>CallbackPage</div>;
}
