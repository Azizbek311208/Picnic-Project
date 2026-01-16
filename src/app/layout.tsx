"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch } from "react-redux";
import store from "@/(redux)/store";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import First from "@/components/First";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { setCart } from "@/(redux)/(slices)/CartSlices";
 // import your action

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Hydrate cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  // Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname.startsWith("/admin")) {
        if (user.email !== "azizbekfayziyev244@gmail.com") {
          router.push("/sign-up");
        }
      } else if (location.pathname.startsWith("/admin")) {
        router.push("/sign-up");
      }
    });

    return () => unsub();
  }, [router]);

  return (
    <>
      <First />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </Provider>
    </html>
  );
}
