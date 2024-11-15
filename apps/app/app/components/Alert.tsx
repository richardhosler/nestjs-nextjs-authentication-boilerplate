export const Alert = ({ children }: { children?: string }) => {
  return (
    <div
      className={`${children ? "visible" : "hidden"} bg-red-200 border-solid border-2 w-full h-full block p-2 rounded-sm`}
      role="alert">
      {children}
    </div>
  );
};
