import { Avatar, Button } from "@heroui/react";
import useAuth from "../Hooks/useAuth";
import { NavLink, useLocation } from "react-router-dom";
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
  HiChevronDown,
  HiEllipsisHorizontal,
  HiHandThumbUp,
  HiChatBubbleLeft,
  HiShare,
  HiXMark
} from "react-icons/hi2";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export default function Home() {
  const { userData } = useAuth();
  const location = useLocation();
  const isMyPostsPage = location.pathname.includes("my-posts");

  const [postContent, setPostContent] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const privacyRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [allPosts, setAllPosts] = useState<any[]>(() => {
    const saved = localStorage.getItem("route_posts");
    return saved ? JSON.parse(saved) : [];
  });

  const posts = isMyPostsPage 
    ? allPosts.filter((post: any) => post.author === (userData?.name || "Mohamed Melad"))
    : allPosts;

  const [activeMenuPostId, setActiveMenuPostId] = useState<number | null>(null);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<number | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [showCommentEmojiId, setShowCommentEmojiId] = useState<number | null>(null);
  const commentEmojiRef = useRef<HTMLDivElement>(null);
  
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const [sharingPost, setSharingPost] = useState<any | null>(null);
  const [shareCaption, setShareCaption] = useState("");

  const [activeCommentMenuId, setActiveCommentMenuId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});

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

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setPostContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const onCommentEmojiClick = (postId: number, emojiData: EmojiClickData) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: (prev[postId] || "") + emojiData.emoji
    }));
    setShowCommentEmojiId(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (privacyRef.current && !privacyRef.current.contains(event.target as Node)) {
        setIsPrivacyOpen(false);
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (commentEmojiRef.current && !commentEmojiRef.current.contains(event.target as Node)) {
        setShowCommentEmojiId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreatePost = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      content: postContent,
      author: userData?.name || "Mohamed Melad",
      username: userData?.email ? `@${userData.email.split("@")[0]}` : "@mohamedmelad11",
      photo: userData?.photo || "",
      privacy: privacy,
      createdAt: "Just now",
      likesCount: 0,
      isLiked: false,
      sharesCount: 0,
      comments: [],
      isSaved: false
    };

    const updatedPosts = [newPost, ...allPosts];
    setAllPosts(updatedPosts);
    localStorage.setItem("route_posts", JSON.stringify(updatedPosts));
    setPostContent("");
  };

  const handleToggleLike = (postId: number) => {
    const updated = allPosts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1
        };
      }
      return post;
    });
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
  };

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const updated = allPosts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: userData?.name || "Mohamed Melad",
          username: userData?.email ? `@${userData.email.split("@")[0]}` : "@mohamedmelad11",
          photo: userData?.photo || "",
          content: text,
          createdAt: "Just now",
          likesCount: 0,
          isLiked: false,
          replies: []
        };
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    });

    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleToggleCommentLike = (postId: number, commentId: number) => {
    const updated = allPosts.map(post => {
      if (post.id === postId) {
        const updatedComments = (post.comments || []).map((comment: any) => {
          if (comment.id === commentId) {
            const isLiked = !comment.isLiked;
            return {
              ...comment,
              isLiked,
              likesCount: isLiked ? comment.likesCount + 1 : comment.likesCount - 1
            };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    const updated = allPosts.map(post => {
      if (post.id === postId) {
        const updatedComments = (post.comments || []).filter((comment: any) => comment.id !== commentId);
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setActiveCommentMenuId(null);
  };

  const handleSaveEditComment = (postId: number, commentId: number) => {
    if (!editedCommentContent.trim()) return;
    const updated = allPosts.map(post => {
      if (post.id === postId) {
        const updatedComments = (post.comments || []).map((comment: any) => {
          if (comment.id === commentId) {
            return { ...comment, content: editedCommentContent };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setEditingCommentId(null);
    setEditedCommentContent("");
    setActiveCommentMenuId(null);
  };

  const handleAddReply = (postId: number, commentId: number) => {
    const text = replyInputs[commentId];
    if (!text || !text.trim()) return;

    const updated = allPosts.map(post => {
      if (post.id === postId) {
        const updatedComments = (post.comments || []).map((comment: any) => {
          if (comment.id === commentId) {
            const newReply = {
              id: Date.now(),
              author: userData?.name || "Mohamed Melad",
              username: userData?.email ? `@${userData.email.split("@")[0]}` : "@mohamedmelad11",
              photo: userData?.photo || "",
              content: text,
              createdAt: "Just now"
            };
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setReplyInputs({ ...replyInputs, [commentId]: "" });
    setReplyingToCommentId(null);
  };

  const handleSavePost = (postId: number) => {
    const updated = allPosts.map(post => {
      if (post.id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    });
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setActiveMenuPostId(null);
  };

  const handleDeletePost = (postId: number) => {
    const updated = allPosts.filter(post => post.id !== postId);
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setActiveMenuPostId(null);
  };

  const handleSaveEdit = (postId: number) => {
    if (!editedContent.trim()) return;
    const updated = allPosts.map(post => {
      if (post.id === postId) {
        return { ...post, content: editedContent };
      }
      return post;
    });
    setAllPosts(updated);
    localStorage.setItem("route_posts", JSON.stringify(updated));
    setEditingPostId(null);
    setEditedContent("");
    setActiveMenuPostId(null);
  };

  const handleShareSubmit = () => {
    if (!sharingPost) return;
    const newSharedPost = {
      id: Date.now(),
      content: shareCaption ? `${shareCaption}\n\n--- Shared Post ---\n${sharingPost.content}` : sharingPost.content,
      author: userData?.name || "Mohamed Melad",
      username: userData?.email ? `@${userData.email.split("@")[0]}` : "@mohamedmelad11",
      photo: userData?.photo || "",
      privacy: "Public",
      createdAt: "Just now",
      likesCount: 0,
      isLiked: false,
      sharesCount: 0,
      comments: [],
      isSaved: false
    };

    const updated = allPosts.map(post => {
      if (post.id === sharingPost.id) {
        return { ...post, sharesCount: post.sharesCount + 1 };
      }
      return post;
    });

    const finalPosts = [newSharedPost, ...updated];
    setAllPosts(finalPosts);
    localStorage.setItem("route_posts", JSON.stringify(finalPosts));
    setSharingPost(null);
    setShareCaption("");
  };

  const isPostDisabled = postContent.trim() === "";

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-700 font-semibold"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
      
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
              <Avatar.Fallback>{userData?.name?.slice(0, 2).toUpperCase() || "MO"}</Avatar.Fallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-gray-900">{userData?.name || "Mohamed Melad"}</h3>
              
              <div className="relative mt-1" ref={privacyRef}>
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-xl text-xs font-semibold text-gray-700 transition"
                >
                  <HiGlobeAmericas className="text-gray-500 text-sm" />
                  <span>{privacy}</span>
                  <HiChevronDown className="text-[10px] text-gray-500" />
                </button>

                {isPrivacyOpen && (
                  <div className="absolute left-0 mt-1 w-36 rounded-xl bg-white shadow-lg border border-gray-100 z-20 py-1">
                    <button type="button" onClick={() => { setPrivacy("Public"); setIsPrivacyOpen(false); }} className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">Public</button>
                    <button type="button" onClick={() => { setPrivacy("Followers"); setIsPrivacyOpen(false); }} className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">Followers</button>
                    <button type="button" onClick={() => { setPrivacy("Only me"); setIsPrivacyOpen(false); }} className="w-full text-left px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">Only me</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <textarea
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`What's on your mind, ${userData?.name || "Mohamed Melad"}?`}
            className="w-full rounded-2xl border border-blue-200 bg-white p-4 text-gray-900 focus:border-blue-600 focus:outline-none resize-none placeholder:text-gray-400 text-sm"
          ></textarea>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 relative">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition cursor-pointer">
                <HiPhoto className="text-xl text-green-500" />
                Photo/video
                <input type="file" accept="image/*,video/*" className="hidden" />
              </label>

              <div className="relative" ref={emojiPickerRef}>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  <HiFaceSmile className="text-xl text-amber-500" />
                  Feeling/activity
                </button>

                {showEmojiPicker && (
                  <div className="absolute left-0 mt-2 z-50 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 bg-white">
                    <EmojiPicker onEmojiClick={onEmojiClick} width={320} height={380} />
                  </div>
                )}
              </div>
            </div>

            <Button
              isDisabled={isPostDisabled}
              onClick={handleCreatePost}
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

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                
                <div className="flex items-center justify-between relative">
                  <div className="flex items-center gap-3">
                    <Avatar size="md" className="ring-2 ring-blue-100">
                      <Avatar.Image src={post.photo} alt={post.author} />
                      <Avatar.Fallback>{post.author?.slice(0, 2).toUpperCase() || "MO"}</Avatar.Fallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span>{post.username || "@mohamedmelad11"}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><HiGlobeAmericas /> {post.privacy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSavePost(post.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold transition ${
                        post.isSaved 
                          ? "bg-blue-50 text-blue-600" 
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <HiBookmark className="text-sm" />
                      {post.isSaved ? "Saved" : "Save"}
                    </button>

                    <button 
                      onClick={() => setActiveMenuPostId(activeMenuPostId === post.id ? null : post.id)}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition"
                    >
                      <HiEllipsisHorizontal className="text-xl" />
                    </button>
                  </div>

                  {activeMenuPostId === post.id && (
                    <div className="absolute right-0 top-12 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-30 text-xs font-semibold text-gray-700 space-y-1">
                      <button 
                        onClick={() => { setEditingPostId(post.id); setEditedContent(post.content); setActiveMenuPostId(null); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 text-gray-700"
                      >
                        <HiPhoto className="text-base text-gray-500" />
                        Edit post
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2.5 text-red-600"
                      >
                        <HiXMark className="text-base text-red-500" />
                        Delete post
                      </button>
                    </div>
                  )}
                </div>

                {editingPostId === post.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full p-3 rounded-xl border border-blue-300 focus:outline-none text-sm"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button" 
                        onClick={() => setEditingPostId(null)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleSaveEdit(post.id)}
                        className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{post.content}</p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="bg-blue-600 text-white p-1 rounded-full text-[10px]"><HiHandThumbUp /></span>
                    <span className="text-gray-900 font-bold">{post.likesCount}</span> likes
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{post.sharesCount} shares</span>
                    <span>{(post.comments || []).length} comments</span>
                    <span className="text-blue-600 font-semibold cursor-pointer">View details</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 pt-1">
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition ${
                      post.isLiked 
                        ? "bg-blue-50 text-blue-600 font-bold" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <HiHandThumbUp className="text-lg" />
                    Like
                  </button>

                  <button
                    onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    <HiChatBubbleLeft className="text-lg" />
                    Comment
                  </button>

                  <button
                    onClick={() => setSharingPost(post)}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    <HiShare className="text-lg" />
                    Share
                  </button>
                </div>

                {openCommentsPostId === post.id && (
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                      <span>Comments ({ (post.comments || []).length })</span>
                      <span className="text-gray-400 font-normal">Most relevant</span>
                    </div>

                    <div className="space-y-3">
                      {(post.comments || []).length > 0 ? (
                        post.comments.map((comment: any) => {
                          const isMyComment = comment.author === (userData?.name || "Mohamed Melad");
                          return (
                            <div key={comment.id} className="bg-gray-50 p-3 rounded-2xl space-y-2 relative">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar size="sm">
                                    <Avatar.Image src={comment.photo} />
                                    <Avatar.Fallback>{comment.author?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                  </Avatar>
                                  <div>
                                    <h5 className="font-bold text-xs text-gray-900">{comment.author}</h5>
                                    <span className="text-[10px] text-gray-400">{comment.username} • {comment.createdAt}</span>
                                  </div>
                                </div>

                                <div className="relative">
                                  <button
                                    onClick={() => setActiveCommentMenuId(activeCommentMenuId === comment.id ? null : comment.id)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition"
                                  >
                                    <HiEllipsisHorizontal className="text-lg" />
                                  </button>

                                  {activeCommentMenuId === comment.id && (
                                    <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30 text-xs font-semibold text-gray-700 space-y-1">
                                      {isMyComment && (
                                        <button
                                          onClick={() => { setEditingCommentId(comment.id); setEditedCommentContent(comment.content); setActiveCommentMenuId(null); }}
                                          className="w-full text-left px-3 py-1.5 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                                        >
                                          Edit
                                        </button>
                                      )}
                                      <button
                                        onClick={() => handleDeleteComment(post.id, comment.id)}
                                        className="w-full text-left px-3 py-1.5 hover:bg-red-50 flex items-center gap-2 text-red-600"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {editingCommentId === comment.id ? (
                                <div className="space-y-2 pl-8">
                                  <input
                                    type="text"
                                    value={editedCommentContent}
                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                    className="w-full p-2 bg-white rounded-xl border border-blue-300 text-xs focus:outline-none"
                                  />
                                  <div className="flex justify-end gap-2">
                                    <button onClick={() => setEditingCommentId(null)} className="text-[10px] text-gray-500 px-2 py-1">Cancel</button>
                                    <button onClick={() => handleSaveEditComment(post.id, comment.id)} className="text-[10px] bg-blue-600 text-white px-3 py-1 rounded-lg">Save</button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-xs text-gray-800 pl-8">{comment.content}</p>
                              )}

                              <div className="flex items-center gap-4 pl-8 text-[11px] font-semibold text-gray-500 pt-1">
                                <span>{comment.createdAt}</span>
                                <button
                                  onClick={() => handleToggleCommentLike(post.id, comment.id)}
                                  className={`hover:text-blue-600 ${comment.isLiked ? "text-blue-600 font-bold" : ""}`}
                                >
                                  Like ({comment.likesCount || 0})
                                </button>
                                <button
                                  onClick={() => setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)}
                                  className="hover:text-blue-600"
                                >
                                  Reply
                                </button>
                              </div>

                              {(comment.replies || []).length > 0 && (
                                <div className="pl-8 pt-2 space-y-2 border-t border-gray-200/60 mt-2">
                                  {comment.replies.map((reply: any) => (
                                    <div key={reply.id} className="bg-white p-2.5 rounded-xl border border-gray-100 space-y-1">
                                      <div className="flex items-center gap-2">
                                        <Avatar size="sm">
                                          <Avatar.Fallback>{reply.author?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                        </Avatar>
                                        <div>
                                          <h6 className="font-bold text-[11px] text-gray-900">{reply.author}</h6>
                                          <span className="text-[9px] text-gray-400">{reply.createdAt}</span>
                                        </div>
                                      </div>
                                      <p className="text-[11px] text-gray-800 pl-7">{reply.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {replyingToCommentId === comment.id && (
                                <div className="pl-8 pt-2 flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={replyInputs[comment.id] || ""}
                                    onChange={(e) => setReplyInputs({ ...replyInputs, [comment.id]: e.target.value })}
                                    placeholder="Write a reply..."
                                    className="w-full bg-white p-2 rounded-xl border border-gray-200 text-xs focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleAddReply(post.id, comment.id)}
                                    className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-blue-700"
                                  >
                                    Reply
                                  </button>
                                </div>
                              )}

                            </div>
                          );
                        })
                      ) : (
                        <div className="bg-gray-50/50 rounded-2xl p-6 text-center border border-gray-100 text-gray-400 text-xs">
                          No comments yet. Be the first to comment.
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Avatar size="sm">
                        <Avatar.Fallback>{userData?.name?.slice(0, 2).toUpperCase() || "MO"}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex-1 relative flex items-center bg-gray-50 rounded-2xl border border-gray-200 px-4 py-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          placeholder={`Comment as ${userData?.name || "Mohamed Melad"}...`}
                          className="w-full bg-transparent text-xs text-gray-800 focus:outline-none pr-24"
                        />
                        <div className="absolute right-3 flex items-center gap-2 text-gray-400">
                          <label className="cursor-pointer hover:text-gray-600 text-base">
                            <HiPhoto />
                            <input type="file" accept="image/*,video/*" className="hidden" />
                          </label>

                          <button
                            type="button"
                            onClick={() => setShowCommentEmojiId(showCommentEmojiId === post.id ? null : post.id)}
                            className="hover:text-gray-600 text-base"
                          >
                            <HiFaceSmile />
                          </button>

                          {showCommentEmojiId === post.id && (
                            <div className="absolute right-0 bottom-10 z-50 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 bg-white" ref={commentEmojiRef}>
                              <EmojiPicker onEmojiClick={(emojiData) => onCommentEmojiClick(post.id, emojiData)} width={300} height={350} />
                            </div>
                          )}

                          <button 
                            onClick={() => handleAddComment(post.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full transition ml-1"
                          >
                            <HiPaperAirplane className="text-xs rotate-45" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 text-gray-500 text-sm">
              {isMyPostsPage ? "You have not published any posts yet." : "No posts yet. Be the first one to publish."}
            </div>
          )}
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