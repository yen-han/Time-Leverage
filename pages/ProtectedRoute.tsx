import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "@/Authentication/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user }: any = useAuth();

  useEffect(() => {
    if (!user.uid) {
      router.push("/login");
    }
  }, [router, user]);
  return <div>{user ? children : "Not found"}</div>;
};

export default ProtectedRoute;
