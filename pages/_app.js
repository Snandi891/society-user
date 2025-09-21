import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const member = localStorage.getItem("member");
    const hasAccount = localStorage.getItem("hasAccount");

    if (router.pathname === "/") {
      if (member) {
        router.replace("/member-home"); // Member dashboard
      } else if (!user && !hasAccount) {
        router.replace("/register"); // First-time visitor
      } else if (!user) {
        router.replace("/login"); // Default → login
      }
      // If user exists and homepage, do nothing
    }

    setReady(true);
  }, [router]);

  if (!ready) return null; // Prevent hydration flash

  return <Component {...pageProps} />;
}

export default MyApp;
