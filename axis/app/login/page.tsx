"use client";

import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";

export default function Login() {
  const googleLogin = async () => {
    try {
      await account.createOAuth2Token(
        OAuthProvider.Google,
        "http://localhost:3000/dashboard",
        "http://localhost:3000/login"
      );
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-violet-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full" />

      {/* Logo */}
      <div className="absolute top-6 left-6">
        <img
          className="w-32"
          src="https://ik.imagekit.io/jwt52yyie/e33394b1-1bae-47ad-b3ac-a7d1723e23db.png?updatedAt=1779300879872"
          alt="Axis Logo"
        />
      </div>

      {/* Main */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between gap-20">

        {/* Left Content */}
        <div className="hidden lg:flex flex-col max-w-xl">
          <p className="text-violet-400 uppercase tracking-[0.25em] text-sm mb-5">
            Axis Workspace
          </p>

          <h1 className="text-6xl leading-tight font-black uppercase">
            Store your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-400">
              {" "}links,
            </span>
            <br />
            files &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-400">
              {" "}notes.
            </span>
          </h1>

          <p className="text-gray-500 text-lg mt-6 leading-relaxed">
            A clean and secure space to save everything important in one place.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[400px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-3xl p-8">

          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <img
              className="w-7 h-7"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
          </div>

          <h2 className="text-3xl font-semibold">
            Welcome to Axis
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Sign in with Google to continue to Axis.
          </p>

          <button
            onClick={googleLogin}
            className="w-full mt-8 h-14 rounded-2xl bg-white text-black font-medium flex items-center justify-center gap-3 hover:bg-gray-200 transition-all duration-300"
          >
            <img
              className="w-5 h-5"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-600">
            <p>Notes</p>
            <p>Files</p>
            <p>Links</p>
          </div>
        </div>
      </div>
    </div>
  );
}