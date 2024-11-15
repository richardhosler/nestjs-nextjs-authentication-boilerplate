export function Title({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <h1 className="text-2xl font-bold text-center">{children}</h1>;
}
