import React from "react";
import TodoList from "@/components/TodoList";
import Navbar from "@/components/navbar";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SiteFooter } from "@/components/site-footer";

function Dashboard() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <div className="max-w-full min-w-full bg-black" style={{minWidth:"100%"}}>
        <Navbar />
        {!session && (
         <div className="p-4 flex min-h-screen flex-col bg-black justify-center items-center w-full">
         <div className="w-full max-w-xl min-h-screen bg-black p-5 rounded-lg text-base bg-34495e text-white">
           
         <Auth
                    supabaseClient={supabase}
                    appearance={{
                      style: {
                        button: {
                          background: "#1abc9c", 
                          color: "white",
                          width: "100%",
                          padding: "15px 25px",
                          borderRadius: "20px", 
                          cursor: "pointer",
                          border: "none",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", 
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
                          border: "2px solid #1abc9c",
                          borderRadius: "10px",
                          transition: "all 0.3s ease",
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
                          borderRadius: "15px", 
                          color: "#fff",
                          backgroundColor: "#3498db",
                        },
                      },
                    }}
                  />
         </div>
       </div>

        )}
        {session && (
          <div
            className=" bg-white justify-center rounded h-full p-4 flex flex-col  items-center "
            style={{
              minWidth: 250,
              margin: "auto",
              paddingTop: "4vh",
            }}
          >
            <TodoList session={session} />
          </div>
        )}
        {/* <footer style={{bottom:0}}>
          <SiteFooter />
        </footer> */}
      </div>
    </>
  );
}

export default Dashboard;
