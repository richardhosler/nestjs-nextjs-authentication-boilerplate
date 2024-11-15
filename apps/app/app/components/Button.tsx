import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  children,
  isLoading = false,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={`${isLoading ? "opacity-50" : null} w-full justify-center rounded-md bg-gray-600 px-6 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer transition`}
      {...props}>
      {children}
    </button>
  );
};
