"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useAppControllerLogout } from "schema/src/react-query.generated";

import { Title } from "../components/Title";

export default function Page() {
  const { mutate: logout } = useAppControllerLogout();

  useEffect(() => {
    logout();
    localStorage.removeItem("JWT");
    Cookies.remove("JWT", { sameSite: "Strict" });
    redirect("/");
  }, [logout]);

  return (
    <>
      <Title>Logout</Title>
      <div className="text-center text-xl/9 font-bold tracking-tight text-gray-900">
        <p>You have been logged out.</p>
      </div>
    </>
  );
}
