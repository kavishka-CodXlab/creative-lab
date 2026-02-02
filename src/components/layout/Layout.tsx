import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      {!isAdminPage && <Navbar />}
      <main className="flex-1 overflow-x-hidden w-full">{children}</main>
      {!isAdminPage && <Footer />}
    </div>
  );
}
