"use client";

import { getUser } from "@/app/actions";
import { useEffect } from "react";
import { TypeSearchParams } from "../page";
import { redirect } from "next/navigation";

const SetCookieWithActionProvider = ({
  params,
  children,
}: {
  params: Awaited<TypeSearchParams>;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const setCookie = async () => {
      const response = await getUser(params);

      if (response.status === 200) {
        redirect("/dashboard");
      }

      if (response.status === 400) {
        redirect("/?loginError=invalidRequest");
      }

      if (response.status === 500) {
        redirect("/?loginError=serverError");
      }
    };

    setCookie();
  }, [params]);

  return <>{children}</>;
};

export default SetCookieWithActionProvider;
