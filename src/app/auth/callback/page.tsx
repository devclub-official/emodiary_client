import { getUser } from "@/app/actions";

export type SearchParams = { [key: string]: string | string[] | undefined };

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await getUser(searchParams);

  return <div>callback page</div>;
}
