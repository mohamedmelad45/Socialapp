import { Avatar } from "@heroui/react";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { HiEnvelope, HiUsers, HiDocumentText, HiBookmark, HiFaceSmile } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export default function Profile() {
  const { userData } = useAuth();
  const [bio, setBio] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [userPosts] = useState<any[]>(() => {
    const saved = localStorage.getItem("route_posts");
    if (!saved) return [];
    const allPosts = JSON.parse(saved);
    return allPosts.filter((post: any) => post.author === (userData?.name || "Mohamed Melad"));
  });

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setBio((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

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
                <h1 className="text-2xl font-bold text-gray-900">{userData?.name || "Mohamed Melad"}</h1>
                <p className="text-sm text-gray-500">@{userData?.email?.split("@")[0] || "mohamedmelad11"}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <HiUsers className="text-sm" />
                  Route Posts member
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                to="/saved"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-2xl text-xs transition shadow-sm"
              >
                <HiBookmark className="text-base" />
                View Saved Posts
              </NavLink>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center min-w-[100px]">
                <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">My Posts</span>
                <span className="text-xl font-bold text-gray-900">{userPosts.length}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-gray-100">
            
            <div className="lg:col-span-5 bg-gray-50/50 rounded-2xl p-5 border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">About</h3>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition"
                >
                  <HiFaceSmile className="text-xl" />
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Add a bio about yourself..."
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs resize-none bg-white"
                  rows={2}
                />

                {showEmojiPicker && (
                  <div className="absolute z-50 mt-2 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 bg-white">
                    <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
                  </div>
                )}
              </div>

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

            <div className="lg:col-span-7 flex items-center">
              <div className="w-full bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <HiDocumentText className="text-blue-600 text-base" />
                  TOTAL PUBLISHED POSTS
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">{userPosts.length}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4 text-xs font-bold text-gray-700">
          <HiDocumentText className="text-base text-blue-600" />
          My Posts History
        </div>

        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post.id} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image src={post.photo} />
                      <Avatar.Fallback>{post.author?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{post.author}</h4>
                      <span className="text-[10px] text-gray-400">{post.createdAt}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-800">{post.content}</p>
              </div>
            ))
          ) : (
            <div className="bg-gray-50/50 rounded-2xl p-10 text-center border border-gray-100 text-gray-400 text-xs font-medium">
              You have not posted yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}