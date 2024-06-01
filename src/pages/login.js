import React from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const provider = new GoogleAuthProvider();

function Login() {
  return (
    <section
      className="w-full h-[100vh] px-[120px] py-16"
      style={{
        backgroundImage: `url("/login_bg.svg")`,
      }}
    >
      
      <div
        style={{
          boxShadow:
            "0px 6px 24px -4px rgba(18, 25, 56, 0.10), 0px 12px 48px 4px rgba(18, 25, 56, 0.15)",
          backdropFilter: "blur(24px)",
        }}
        className="bg-[#3c498b4d] w-full max-w-[600px] h-[75vh] rounded-lg flex flex-col items-center px-10 py-10"
      >
        <div className="w-[300px] bg-white text-secondary font-semibold rounded-xl flex items-center justify-center gap-5 py-2 ">
          <img src="Google.svg" /> <div>Login with Google</div>
        </div>
      </div>
     
    </section>
  );
}

export default Login;
