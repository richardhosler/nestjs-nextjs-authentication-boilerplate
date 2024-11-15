"use client";
import { useAppControllerLogin } from "schema/src/react-query.generated";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "./Button";
import { Input } from "./Input";
import { Alert } from "./Alert";
import Link from "next/link";

export function Login() {
  const { mutate: login, error } = useAppControllerLogin<AxiosError>();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  });
  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const router = useRouter();

  const handleLogin: SubmitHandler<Schema> = (data) => {
    login(
      { data },
      {
        onSuccess: (response) => {
          //@ts-expect-error -- orval type error
          const responseToken = response.access_token as string;
          localStorage.setItem("JWT", responseToken);
          Cookies.set("JWT", responseToken, { sameSite: "strict" });
          router.push("/profile");
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col mx-auto w-full max-w-sm space-y-4">
        {/* @ts-expect-error -- orval type error */}
        <Alert>{error?.response?.data?.message}</Alert>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col space-y-4">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            label="Email address"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit">Sign in</Button>
        </form>

        <p className="text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className={`font-semibold hover:text-indigo-500 ease-out ${error?.message ? "text-red-500" : "text-indigo-600"}`}>
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
