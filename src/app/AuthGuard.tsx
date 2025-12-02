"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const isAdmin = user?.email === "azizbekfayziyev244@gmail.com";
      const isAdminPage = path.startsWith("/admin");

      if (!user && isAdminPage) {
        router.push("/sign-up");
        return;
      }

      if (user && isAdminPage && !isAdmin) {
        router.push("/");
        return;
      }
    });

    return () => unsub();
  }, [path, router]);

  return <>{children}</>;
}
