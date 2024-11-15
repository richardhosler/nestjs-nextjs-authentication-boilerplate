"use client";
import { useAppControllerRegister } from "schema/src/react-query.generated";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import * as z from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AxiosError } from "axios";
import { Alert } from "../components/Alert";
import { Title } from "../components/Title";
import { redirect } from "next/navigation";

export default function Page() {
  const schema = z
    .object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 8 characters" }),
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });
  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const {
    mutate: registerUser,
    reset,
    error,
  } = useAppControllerRegister<AxiosError>();
  const onSubmit: SubmitHandler<Schema> = (data) => {
    registerUser(
      { data },
      {
        onSuccess: (response) => {
          //@ts-expect-error -- orval type error
          const responseToken = response?.access_token as string;
          localStorage.setItem("JWT", responseToken);
          Cookies.set("JWT", responseToken, { sameSite: "Strict" });
          redirect("/profile");
        },
      }
    );
  };
  return (
    <>
      <Title>Register</Title>
      <div className="flex flex-col mx-auto w-full sm:max-w-sm space-y-4">
        {/* @ts-expect-error -- orval type error */}
        <Alert>{error?.response?.data.message}</Alert>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            label="Email address"
            {...register("email")}
            error={errors.email?.message}
            onBlur={() => {
              clearErrors("email");
            }}
            onFocus={() => {
              reset();
            }}
          />

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            label="Password"
            {...register("password")}
            error={errors.password?.message}
            onBlur={() => {
              clearErrors("password");
            }}
            onFocus={() => {
              reset();
            }}
          />
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            label="Confirm Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            onBlur={() => {
              clearErrors("confirmPassword");
            }}
            onFocus={() => {
              reset();
            }}
          />

          <Input
            id="firstName"
            type="firstName"
            autoComplete="firstName"
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
            onBlur={() => {
              clearErrors("firstName");
            }}
            onFocus={() => {
              reset();
            }}
          />

          <Input
            id="lastName"
            type="lastName"
            autoComplete="lastName"
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            onBlur={() => {
              clearErrors("lastName");
            }}
            onFocus={() => {
              reset();
            }}
          />

          <div>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </>
  );
}
