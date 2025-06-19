import { getUser } from "@/app/actions";
import { redirect } from "next/navigation";

export type TypeSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: TypeSearchParams;
}) {
  const params = await searchParams;
  const response = await getUser(params);

  if (response.status === 200) {
    redirect("/dashboard");
  }

  if (response.status === 400) {
    redirect("/?loginError=serverError");
  }

  if (response.status === 500) {
    redirect("/?loginError=serverError");
  }

  return <div>callback page</div>;
}
