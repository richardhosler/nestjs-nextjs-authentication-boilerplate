"use client";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useAppControllerGetProfile } from "schema/src/react-query.generated";
import { User } from "api/src/users/user.entity";
import { Title } from "../components/Title";
import Link from "next/link";

const useProfileData = () => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const { data, isFetched, isFetching, isPending, refetch } =
    useAppControllerGetProfile<User>({
      query: {
        retry: false,
        enabled: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        networkMode: "always",
      },
    });

  useEffect(() => {
    setToken(Cookies.get("JWT"));
  }, []);

  const handleFetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    token,
    data,
    isFetched,
    isFetching,
    isPending,
    handleFetch,
  };
};

export default function Page() {
  const { token, data, isFetched, isFetching, handleFetch } = useProfileData();

  return (
    <>
      <div className="space-y-4">
        <Title>Profile</Title>
        <div className="text-center text-xl/9 font-bold tracking-tight flex">
          <pre className="block text-gray-500 text-sm/7 font-semibold whitespace-pre-wrap break-all max-w-72 md:max-w-md m-auto min-h-32">
            <span className="rounded-md text-xs bg-gray-900 text-white pl-1 pr-1 pb-0.5 pt-1 font-extralight mr-0.5 align-middle">
              JWT
            </span>
            <span className="flex-grow">{token && token.toString()}</span>
          </pre>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-96 space-y-4">
            {isFetched && !isFetching && (
              <div className="text-gray-900 flex flex-col space-y-4">
                <div className="flex justify-center items-center gap-4 min-w-6">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                    <svg
                      className="relative w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="text-gray-900 font-semibold">
                    <div>
                      {data?.firstName} {data?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{data?.email}</div>
                  </div>
                </div>

                <table className="text-sm divide-y bg-gray-200 overflow-x-scroll">
                  <thead className="font-semibold">
                    <tr className="py-3 px-4 text-left bg-gray-300">
                      <th className="py-3 px-4 text-left">User ID</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">{data?.id}</td>
                      <td className="py-2 px-4">
                        {data?.isActive ? "Active" : "Deactivated"}
                      </td>
                      <td className="py-2 px-4">{data?.role}</td>
                      <td className="py-2 px-4">
                        {data?.createdAt &&
                          new Date(data?.createdAt).toDateString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex space-x-4">
              <Link
                href="#"
                className={
                  "w-full justify-center text-center rounded-md bg-gray-600 px-6 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer transition"
                }
                onClick={handleFetch}>
                Refetch User
              </Link>
              <Link
                className={
                  "w-full justify-center text-center rounded-md bg-gray-600 px-6 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer transition"
                }
                href="logout">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
