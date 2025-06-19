import SetCookieWithActionProvider from "./_components/useSetCookieWithAction";

export type TypeSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: TypeSearchParams;
}) {
  const params = await searchParams;

  return (
    <SetCookieWithActionProvider params={params}>
      <div>callback page</div>
    </SetCookieWithActionProvider>
  );
}
