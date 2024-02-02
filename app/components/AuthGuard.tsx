"use client";
import userGlobaleStore, { GlobalStoreInterface } from "@/store/GlobalStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = userGlobaleStore((state: GlobalStoreInterface) => state.user);

  useEffect(() => {
    if (!user) router.push("/login");
    else router.push("/dashboard");
  }, [user]);

  return <>{children}</>;
};

export default AuthGuard;
