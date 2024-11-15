import { ReactQueryProvider } from "./query-client-provider";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Authorisation application",
  description: "Portfolio piece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-white text-gray-900"}>
        <ReactQueryProvider>
          <div className="min-h-full flex-col flex space-y-8">
            <Header />
            <div className="flex flex-col min-h-full items-center px-4 lg:px-8">
              {children}
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
