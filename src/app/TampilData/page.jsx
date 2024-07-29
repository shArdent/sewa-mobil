"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/");
    }

  }, [status]);


  return (
    <div className="px-16 py-10 ml-auto h-auto flex flex-col justify-start">
      HOHOOHOHOH
    </div>
  );
};

export default page;
