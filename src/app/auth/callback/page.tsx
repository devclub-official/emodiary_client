import { getUser } from "@/app/actions";

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = searchParams;
  await getUser(params);

  return <div>callback page</div>;
}
