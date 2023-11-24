import Head from "next/head";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import TodoList from "@/components/TodoList";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="Created by team 7 of LICET." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <div className="flex justify-end p-4">
          {!session ? (
            <button
              className={cn(
                buttonVariants({
                  size: "lg",
                  className: "border border-zinc-300 hover:bg-blue-600",
                })
              )}
              onClick={handleLoginButtonClick}
            >
              Login
            </button>
          ) : (<button
            className="btn-black w-30 mt-2"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log("Error logging out:", error.message);
            }}
          >
            Logout
          </button>
          )}
        </div>

        {!session && showLogin && (
          <div className="min-w-full min-h-screen flex items-center justify-center">
            <div className="w-full h-full flex justify-center items-center p-4">
              <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
                <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
                  Login
                </span>
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="light"
                />
              </div>
            </div>
          </div>
        )}

        {(!session || (!session && !showLogin)) && (
          <section
            className="space-y-6 mt-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 h-100"
            style={{ minHeight: "100vh" }}
          >
            <div className="container flex  flex-col items-center gap-4 text-center">
              <h1 className="font-heading text-teal-950 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                To-Do List Webapp
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                This is a To-Do list webapp created for Naan mudhalvan
                course(Full Stack Development with Java) by Team 7 of
                Loyola-ICAM College of Engineering and Technology.
              </p>
              <div className="space-x-4">
                <Link
                  href="https://github.com/AntonyJudeShaman"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      className: "border border-zinc-300 hover:bg-blue-600",
                    })
                  )}
                >
                  GitHub
                </Link>
              </div>
            </div>
          </section>
        )}

        {session && !showLogin && (
          <div
            className="w-full h-full flex flex-col justify-center items-center p-4"
            style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
          >
            <TodoList session={session} />
            <button
              className="btn-black w-full mt-12"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) console.log("Error logging out:", error.message);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
