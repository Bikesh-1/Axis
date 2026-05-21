"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await account.get();
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
    // No dependencies, only run on mount
    // eslint-disable-next-line
  }, []);

  const logout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="absolute top-0 left-0 flex items-center justify-between w-full p-4">
        <img
          className="w-40"
          src="https://ik.imagekit.io/jwt52yyie/e33394b1-1bae-47ad-b3ac-a7d1723e23db.png?updatedAt=1779300879872"
          alt="Logo"
        />
      </div>

      {/* Content */}
      <div className="flex items-center justify-center h-screen">
        <div className="w-[400px] p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
          <h1 className="mb-8 text-3xl font-bold">
            Dashboard
          </h1>

          <div className="mb-6">
            <p className="text-gray-400">
              Name
            </p>
            <h2 className="text-xl font-semibold">
              {user?.name || "N/A"}
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-400">
              Email
            </p>

            <h2 className="text-xl font-semibold break-all">
              {user?.email || "N/A"}
            </h2>
          </div>

          <button
            onClick={logout}
            className="w-full py-3 font-semibold text-black transition bg-white rounded-xl hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}