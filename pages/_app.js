import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const member = localStorage.getItem("member");
    const hasAccount = localStorage.getItem("hasAccount");

    if (router.pathname === "/") {
      if (member) {
        router.replace("/member-home");
      } else if (!user && !hasAccount) {
        router.replace("/register");
      } else if (!user) {
        router.replace("/login");
      }
    }

    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <>
      {/* Neon-Glowing Toasts on top-left */}
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(20, 20, 50, 0.95)",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 20px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 0 10px #a855f7, 0 0 20px #3b82f6, 0 0 30px #f472b6",
            border: "1px solid #a855f7",
            transform: "translateX(-100%)",
            animation: "slideInLeft 0.5s forwards",
          },
          success: {
            iconTheme: { primary: "#a855f7", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#f43f5e", secondary: "#fff" },
          },
        }}
      />

      <Component {...pageProps} />

      {/* CSS animation for slide-in */}
      <style jsx global>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export default MyApp;
