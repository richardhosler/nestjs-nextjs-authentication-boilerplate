"use client";
import { redirect, RedirectType } from "next/navigation";

import { Button } from "../components/Button";
import { User } from "./../../../api/src/users/user.entity";

interface UserInfoProps {
  user: User;
  fetchUser: () => void;
  isFetched: boolean;
  isFetching: boolean;
}
export default function UserInfo({
  user,
  fetchUser,
  isFetched,
  isFetching,
}: UserInfoProps) {
  const handleLogout = () => {
    console.log("log out");
    const e = redirect("/", RedirectType.push);
    console.log(typeof e);
  };
  return (
    <div className="flex-box w-full sm:w-96">
      <div className="flex items-center">
        <Button onClick={fetchUser}>Fetch User</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="block min-h-3"></div>
      {isFetched && !isFetching && (
        <div className="text-gray-900 font-semibold">
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
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>

          <table className="text-sm divide-y bg-gray-200 overflow-x-scroll">
            <thead>
              <tr className="py-3 px-4 text-left bg-gray-300">
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Registration Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">
                  {user.isActive ? "Active" : "Deactivated"}
                </td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  {user.createdAt && new Date(user.createdAt).toDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
