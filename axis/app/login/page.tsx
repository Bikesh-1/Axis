"use client"
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";

export default function Login() {

  

  const googleLogin = async () => {

  try {

    await account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/dashboard",
      "http://localhost:3000/login"
    );

  } catch (error) {

    console.log(error);

  }
};

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden">

      <div className="absolute w-full top-0 left-0 flex items-center justify-between p-2">
        <img className="w-40" src="https://ik.imagekit.io/jwt52yyie/e33394b1-1bae-47ad-b3ac-a7d1723e23db.png?updatedAt=1779300879872" alt="" />
      </div>

      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-indigo-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>
      <div className="relative w-[420px] bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 flex flex-col items-center justify-center shadow-2xl">

        <p className="text-gray-400 text-center mt-3 mb-8">
          Continue with your Google account to access your workspace.
        </p>
        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold text-lg py-4 rounded-2xl hover:scale-[1.02] transition-all duration-300">
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />

          Continue with Google
        </button>

        <p className="text-gray-500 text-sm mt-6">
          Simple • Secure • Fast
        </p>
      </div>
    </div>
  );
}