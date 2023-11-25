import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navbar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ... (imports remain unchanged)

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  };

  useEffect(() => {
    if (session && !showLogin && !hasRenderedOnce) {
      setHasRenderedOnce(true);
    }
  }, [session, showLogin, hasRenderedOnce]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Created by team 7 of LICET." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-full h-full"
        style={{ background: "white", maxHeight: "100vh" }}
      >
        <Navbar />

        {!session && !showLogin && (
          <div className="p-4 flex flex-col bg-black justify-center items-center w-full">
            <div className="w-full max-w-xl p-5 rounded-lg text-base bg-34495e text-white">
              
                  <Auth
                    supabaseClient={supabase}
                    appearance={{
                      style: {
                        button: {
                          background: "#1abc9c", // Change to a fresh green color
                          color: "white",
                          width: "100%",
                          padding: "15px 25px",
                          borderRadius: "20px", // Increase border radius for a more rounded look
                          cursor: "pointer",
                          border: "none",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Increase shadow for a more 3D effect
                          transition: "all 0.3s ease", // Add transition to all properties for a smoother effect
                        },
                        anchor: {
                          color: "#3498db",
                          textDecoration: "none",
                          fontWeight: "bold",
                          transition: "color 0.3s ease",
                        },
                        container: {
                          maxWidth: "500px",
                          justifyContent: "center",
                          alignContent: "center",
                          padding: "30px",
                          borderRadius: "25px",
                          backgroundColor: "#34495e",
                          color: "white",
                        },
                        divider: {
                          borderTop: "3px solid #3498db",
                          margin: "30px 0",
                        },
                        label: {
                          display: "block",
                          marginBottom: "15px",
                          color: "#ecf0f1",
                        },
                        input: {
                          width: "100%", 
                          padding: "15px",
                          marginBottom: "20px",
                          border: "2px solid #1abc9c", // Change to a fresh green color
                          borderRadius: "10px",
                          transition: "all 0.3s ease", // Add transition to all properties for a smoother effect
                          color: "white",
                          backgroundColor: "#2c3e50",
                        },

                        loader: {
                          display: "inline-block",
                          border: "4px solid #f3f3f3",
                          borderTop: "4px solid #3498db",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          animation: "spin 1s linear infinite",
                        },
                        message: {
                          padding: "20px",
                          margin: "20px 0",
                          borderRadius: "15px", // Increase border radius for a more rounded look
                          color: "#fff",
                          backgroundColor: "#3498db",
                        },
                      },
                    }}
                  />
            </div>
          </div>
        )}

        {session && !showLogin && toast.success("Log In Successful!")}
        {session && !showLogin && router.push("/dashboard")}
      </div>
    </>
  );
}
