"use client";

import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";

type User = {
  name?: string;
  email?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser  = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log("No active session");
      }
    };
    checkUser();
  }, []);

const logout = async () => {
  try {

    await account.deleteSession("current");
    console.log("Logged out successfully");
    window.location.href = "/login";

  } catch (error) {

    console.error("Error logging out:", error);

  }
};

  return (
    <div className="text-white bg-black h-screen flex items-center justify-center">
      Dashboard
      welcome, {user?.name || user?.email}!
      <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}