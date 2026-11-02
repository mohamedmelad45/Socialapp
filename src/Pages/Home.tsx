import { Avatar, Button } from "@heroui/react";
import useAuth from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  HiNewspaper, 
  HiUser, 
  HiUsers, 
  HiBookmark, 
  HiGlobeAmericas, 
  HiPhoto, 
  HiFaceSmile, 
  HiPaperAirplane, 
  HiMagnifyingGlass, 
  HiUserPlus, 
  HiChevronDown 
} from "react-icons/hi2";

export default function Home() {
  const { userData } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const privacyRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedFriends = [
    { name: "Ahmed Abd Al-...", username: "@ahmedmutti", followers: "517 followers" },
    { name: "Alaa Ashraf", username: "@alaaashraf", followers: "422 followers" },
    { name: "MrMo", username: "@mrmo", followers: "334 followers" },
    { name: "menna", username: "@gbngsssssb", followers: "265 followers" },
  ];

  const filteredFriends = suggestedFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (privacyRef.current && !privacyRef.current.contains(event.target as Node)) {
        setIsPrivacyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPostDisabled = postContent.trim() === "";

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-700 font-semibold"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <div className="lg:col-span-3 space-y-2 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
        <NavLink to="/" end className={linkClassName}>
          <HiNewspaper className="text-xl" />
          Feed
        </NavLink>
        <NavLink to="/my-posts" className={linkClassName}>
          <HiUser className="text-xl" />
          My Posts
        </NavLink>
        <NavLink to="/community" className={linkClassName}>
          <HiUsers className="text-xl" />
          Community
        </NavLink>
        <NavLink to="/saved" className={linkClassName}>
          <HiBookmark className="text-xl" />
          Saved
        </NavLink>
      </div>

      <div className="lg:col-span-6 space-y-6">
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar size="md" className="ring-2 ring-blue-100">
              <Avatar.Image src={userData?.photo} alt={userData?.name} />
              <Avatar.Fallback>{userData?.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-gray-900">{userData?.name || "mohamedmelad"}</h3>
              
              <div className="relative mt-1" ref={privacyRef}>
                <button
                  onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-xl text-xs font-semibold text-gray-700 transition"
                >
                  <HiGlobeAmericas className="text-gray-500 text-sm" />
                  <span>{privacy}</span>
                  <HiChevronDown className="text-[10px] text-gray-500" />
                </button>

                {isPrivacyOpen && (
                  <div className="absolute left-0 mt-1 w-36 rounded-xl bg-white shadow-lg border border-gray-100 z-20 py-1">
                    <button
                      onClick={() => { setPrivacy("Public"); setIsPrivacyOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Public
                    </button>
                    <button
                      onClick={() => { setPrivacy("Followers"); setIsPrivacyOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Followers
                    </button>
                    <button
                      onClick={() => { setPrivacy("Only me"); setIsPrivacyOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Only me
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <textarea
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`What's on your mind, ${userData?.name || "mohamedmelad"}?`}
            className="w-full rounded-2xl border border-blue-200 bg-white p-4 text-gray-900 focus:border-blue-600 focus:outline-none resize-none placeholder:text-gray-400"
          ></textarea>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 relative">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition cursor-pointer">
                <HiPhoto className="text-xl text-green-500" />
                Photo/video
                <input type="file" accept="image/*,video/*" className="hidden" />
              </label>

              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                <HiFaceSmile className="text-xl text-amber-500" />
                Feeling/activity
              </button>
            </div>

            <Button
              isDisabled={isPostDisabled}
              className={`font-semibold px-6 py-2 rounded-xl flex items-center gap-2 transition ${
                isPostDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }`}
            >
              Post
              <HiPaperAirplane className="text-sm transform rotate-[-45deg]" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 text-gray-500">
          No posts yet. Be the first one to publish.
        </div>

      </div>

      <div className="lg:col-span-3 bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <HiUsers className="text-blue-600 text-lg" />
            Suggested Friends
          </h3>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {filteredFriends.length}
          </span>
        </div>

        <div className="relative">
          <HiMagnifyingGlass className="absolute left-3 top-3 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-3 pt-2">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <Avatar.Fallback>{friend.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{friend.name}</h4>
                    <p className="text-[10px] text-gray-500">{friend.username}</p>
                    <span className="text-[9px] text-gray-400">{friend.followers}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-50 text-blue-600 font-semibold text-xs px-3 py-1 rounded-xl hover:bg-blue-100 flex items-center gap-1 h-7">
                  <HiUserPlus className="text-xs" />
                  Follow
                </Button>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">No friends found.</p>
          )}
        </div>
      </div>

    </div>
  );
}