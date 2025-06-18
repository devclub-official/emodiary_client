import { Suspense } from "react";

export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}
