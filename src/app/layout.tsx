import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import First from "@/components/First";
import ReduxProvider from "./ReduxProvider";  
import AuthGuard from "./AuthGuard";  

export const metadata = {
  title: "Picnic Project",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthGuard>
            <First />
            <Header />
            {children}
            <Footer />
          </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}
