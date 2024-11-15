import { forwardRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex-box space-y-2 min-w-full">
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-800">
          {label}
        </label>
        <input
          ref={ref}
          className="rounded-md border-0 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 px-4 py-2 w-full"
          {...props}
        />
        <div className="text-red-600 text-sm">{error && error}</div>
      </div>
    );
  }
);

Input.displayName = "Input";
