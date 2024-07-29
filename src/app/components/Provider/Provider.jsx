"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { SideNav } from "../Menu/SideNav";
import AuthCheck from "../AuthCheck/AuthCheck";

export default function Provider({ children }) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <AuthCheck>
        <div className="flex">
          {pathname !== "/login" && <SideNav />}
          <div
            className={
              pathname !== "/login" ? `w-[79%] ml-auto` : `w-[100%] ml-auto`
            }
          >
            {children}
          </div>
        </div>
      </AuthCheck>
    </SessionProvider>
  );
}
