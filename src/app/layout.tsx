"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "@/(redux)/store";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import First from "@/components/First";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [user, setUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  const path = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return unsub;
  // }, []);

  // const isAdmin = user?.email === "azizbekfayziyev244@gmail.com";

  // useEffect(() => {
  //   if (loading) return;

  //   if (!user && path !== "/sign-in" && path !== "/register") {
  //     router.push("/sign-in");
  //     return;
  //   }

  //   if (user && (path === "/sign-in" || path === "/register")) {
  //     if (isAdmin) {
  //       router.push("/admin/products");
  //     } else {
  //       router.push("/");
  //     }
  //     return;
  //   }
  // }, [user, path, router, isAdmin, loading]);
  const check = () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user && location.pathname.startsWith("/admin")) {
        const uid = user.uid;
        console.log(uid);

        if (user.email !== "azizbekfayziyev244@gmail.com") {
          router.push("/sign-up");
        }
      } else if (location.pathname.startsWith("/admin")) {
        router.push("/sign-up");
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         marginTop: "100px",
  //         fontSize: "18px",
  //         color: "#555",
  //       }}
  //     >
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <First />
          <Header />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
