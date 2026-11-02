import { Avatar } from "@heroui/react";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { HiEnvelope, HiUsers, HiDocumentText, HiBookmark } from "react-icons/hi2";

export default function Profile() {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 relative"></div>

        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex items-end gap-5">
              <Avatar size="lg" className="w-28 h-28 ring-4 ring-white shadow-md bg-white">
                <Avatar.Image src={userData?.photo} alt={userData?.name} />
                <Avatar.Fallback className="text-2xl font-bold">
                  {userData?.name?.slice(0, 2).toUpperCase() || "MO"}
                </Avatar.Fallback>
              </Avatar>

              <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{userData?.name || "mohamedmelad"}</h1>
                <p className="text-sm text-gray-500">@{userData?.email?.split("@")[0] || "mohamedmelad"}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <HiUsers className="text-sm" />
                  Route Posts member
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center min-w-[100px]">
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Followers</span>
                <span className="text-xl font-bold text-gray-900">0</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center min-w-[100px]">
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Following</span>
                <span className="text-xl font-bold text-gray-900">0</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center min-w-[100px]">
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Bookmarks</span>
                <span className="text-xl font-bold text-gray-900">0</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-gray-100">
            
            <div className="lg:col-span-5 bg-gray-50/50 rounded-2xl p-5 border border-gray-100 space-y-4">
              <h3 className="font-bold text-gray-900 text-sm">About</h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-center gap-2.5">
                  <HiEnvelope className="text-base text-gray-400" />
                  <span>{userData?.email || "mohamedmelad22@gmail.com"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HiUsers className="text-base text-gray-400" />
                  <span>Active on Route Posts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <HiDocumentText className="text-blue-600 text-base" />
                  MY POSTS
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">0</span>
              </div>

              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <HiBookmark className="text-blue-600 text-base" />
                  SAVED POSTS
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">0</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "posts"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <HiDocumentText className="text-base" />
            My Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <HiBookmark className="text-base" />
            Saved
          </button>
        </div>

        <div className="bg-gray-50/50 rounded-2xl p-10 text-center border border-gray-100 text-gray-400 text-xs font-medium">
          {activeTab === "posts" ? "You have not posted yet." : "No saved posts yet."}
        </div>
      </div>

    </div>
  );
}