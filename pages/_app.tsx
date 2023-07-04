import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { AuthContextProvider } from "@/Authentication/AuthContext";
import Menu from "@/components/Menu/Menu";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <AuthContextProvider>
      <Menu />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
