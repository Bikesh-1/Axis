"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { account, databases, ID, storage } from "../lib/appwrite";
import { Query } from "appwrite";

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fileId, setFileId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    fileId: "",
  })
  const DATABASE_ID = "6a0f39dd0006f170be30";
  const COLLECTION_ID = "dashboardcontent";
  const BUCKET_ID = "6a0f3cee003a4e1e1866";

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file,
      );
      setFileId(response.$id);
      const filePreview = storage.getFilePreview(
        BUCKET_ID,
        response.$id
      );
      setImageUrl(filePreview);
    } catch (error) {
      console.log(error)
    }
  };

  const downloadFile = (fileId: any) => {
    const downloadUrl = storage.getFileDownload(
      BUCKET_ID,
      fileId
    );

    window.open(downloadUrl);
  };

  const addNote = async (e: any) => {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        userId: user.$id,
        image: imageUrl,
        fileId: fileId,
      }
    );
    setFormData({
      title: "",
      description: "",
      link: "",
      image: "",
      fileId: "",
    });
    getNotes();
  };

  const getNotes = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal("userId", user.$id)
      ]
    );

    setNotes(response.documents);
  };

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user]);


  useEffect(() => {
    const getUser = async () => {
      try {
        const secret = searchParams.get("secret");
        const userId = searchParams.get("userId");

        if (secret && userId) {
          await account.createSession(userId, secret);
          router.replace("/dashboard");
        }

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
  }, [searchParams, router]);

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
    <div className="w-full min-h-screen bg-black text-white">
      <div className=" top-0 left-0 flex items-center justify-between w-full p-4">
        <img
          className="w-40"
          src="https://ik.imagekit.io/jwt52yyie/e33394b1-1bae-47ad-b3ac-a7d1723e23db.png?updatedAt=1779300879872"
          alt="Logo"
        />
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-medium">Welcome to Axis, <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-400 font-black uppercase">{user?.name || "N/A"}</span></h2>
          <button
            onClick={() => setOpen(true)}
            className="w-auto px-4 py-2 font-semibold text-black transition bg-gradient-to-r from-white to-violet-400 rounded-xl hover:scale-105 cursor-pointer">
            + Add Resource
          </button>
          <button
            onClick={logout}
            className="w-auto px-4 py-2 font-semibold text-black transition bg-white rounded-xl hover:scale-105 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">

        {/* adding resourece component */}

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">

            {/* Popup Box */}
            <div className="relative w-[90%] md:w-[50%] h-auto bg-[#0f0f0f]/90 border border-white/10 rounded-3xl shadow-2xl p-8">

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white text-2xl transition"
              >
                ✕
              </button>

              <form
                onSubmit={addNote}
                className="w-full flex flex-col gap-5"
              >
                <div className="mb-3">
                  <h1 className="text-4xl font-bold text-white">
                    Add Resource
                  </h1>

                  <p className="text-gray-400 mt-2">
                    Save your important links and notes.
                  </p>
                </div>

                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  type="text"
                  placeholder="Enter title"
                  className="w-full border border-white/20 bg-transparent text-white placeholder:text-gray-500 px-5 py-4 rounded-2xl outline-none focus:border-[#4E46E4] focus:ring-2 focus:ring-[#4E46E4]/40 transition-all"
                />

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  rows={4}
                  className="w-full border border-white/20 bg-transparent text-white placeholder:text-gray-500 px-5 py-4 rounded-2xl outline-none resize-none focus:border-[#4E46E4] focus:ring-2 focus:ring-[#4E46E4]/40 transition-all"
                />
                <div className="flex items-center justify-center w-full">
  <label className="w-full max-w-md cursor-pointer">
    
    <div className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-indigo-500 rounded-2xl bg-[#0f172a] hover:bg-[#111c35] transition-all duration-300 shadow-lg">
      
      <svg
        className="w-12 h-12 mb-4 text-indigo-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        />
      </svg>

      <p className="text-lg font-semibold text-white">
        Click to upload file
      </p>

      <p className="text-sm text-gray-400 mt-1">
        PNG, JPG, PDF up to 10MB
      </p>
    </div>

    <input
      type="file"
      onChange={uploadFile}
      className="hidden"
    />
  </label>
</div>
                {/* Link */}
                <br />
                <br />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="preview"
                    width={300}
                  />
                )}
                <input
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  type="text"
                  placeholder="Paste URL"
                  className="w-full border border-white/20 bg-transparent text-white placeholder:text-gray-500 px-5 py-4 rounded-2xl outline-none focus:border-[#4E46E4] focus:ring-2 focus:ring-[#4E46E4]/40 transition-all"
                />

                <button
                  type="submit"
                  className="w-full bg-[#4E46E4] hover:bg-[#5d56ff] text-white font-semibold py-4 rounded-2xl transition-all duration-300"
                >
                  Submit Resource
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="h-auto w-full px-10 py-10 ">

          <div className="grid grid-cols-4 gap-6">

            {notes.map((item) => (
              <div
                key={item.$id}
                className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >

                {/* Title */}
                <h1 className="text-2xl font-bold mb-3 line-clamp-1">
                  {item.title}
                </h1>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  className="text-[#4E46E4] text-sm font-semibold mt-4 inline-block hover:underline break-all"
                >
                  Open Link →
                </a>
                <button className="w-auto px-4 py-2 font-semibold text-black transition bg-gradient-to-r from-white to-violet-400 rounded-xl hover:scale-105 cursor-pointer" onClick={() => downloadFile(item.fileId)}>
                  Download File
                </button>

                {item.description.length > 120 && (
                  <button className="mt-5 block text-sm text-gray-400 hover:text-white transition">
                    View More
                  </button>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}