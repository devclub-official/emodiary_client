import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<string>;
}) {
  const currentParams = new URLSearchParams(await searchParams);
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/login/google?${currentParams.toString()}`
  );

  if (!response.ok) {
    if (response.status === 500) {
      currentParams.set("loginError", "serverError");
      redirect("/");
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

  return <div>callback page</div>;
}
