import { getUser } from "@/app/actions";

export type TypeSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: TypeSearchParams;
}) {
  const params = await searchParams;
  await getUser(params);
  return <div>callback page</div>;
}
