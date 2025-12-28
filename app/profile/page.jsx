"use client"
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Activity, Copy, Eye, EyeOff, Lock, Share2, Unlock, Plus, Heart, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import Thought from "@/components/Thought";
import CreateThoughtModal from "@/components/CreateThoughtModal";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import css from "../app.module.sass";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("thoughts"); // thoughts | prints | saved
  const [view, setView] = useState("public");
  const [settings, setSettings] = useState({
    likesVisible: false,
    repliesAllowed: true,
    publicReplies: false,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile and posts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch current user
        const userRes = await fetch("/api/profile");
        if (!userRes.ok) {
          toast.error("Failed to load profile");
          return;
        }

        const user = await userRes.json();
        setProfile(user);

        // Fetch user's posts
        const thoughtsRes = await fetch(`/api/thoughts?userId=${user._id}`);
        if (thoughtsRes.ok) {
          const data = await thoughtsRes.json();
          setPosts(data.data || []);
        }

        // Fetch user's liked posts (pawprints)
        const pawprintsRes = await fetch("/api/user/pawprints");
        if (pawprintsRes.ok) {
          const data = await pawprintsRes.json();
          setLikedPosts(data.pawprints || []);
        }

        // Fetch user's saved posts
        const savesRes = await fetch("/api/save");
        if (savesRes.ok) {
          const data = await savesRes.json();
          setSavedPosts(data.saves || []);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    if (!confirm("Delete this thought?")) return;

    try {
      const res = await fetch(`/api/thoughts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Thought deleted");
    } catch (error) {
      toast.error("Failed to delete thought");
    }
  };

  // Handle like/unlike
  const handleLikePaw = async (thoughtId) => {
    try {
      const isLiked = likedPosts.some((p) => p.thoughtId === thoughtId);

      if (isLiked) {
        const res = await fetch(`/api/pawprint?thoughtId=${thoughtId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to unlike");
        setLikedPosts(likedPosts.filter((p) => p.thoughtId !== thoughtId));
      } else {
        const res = await fetch("/api/pawprint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ thoughtId }),
        });
        if (!res.ok) throw new Error("Failed to like");
        const pawprint = await res.json();
        setLikedPosts([...likedPosts, pawprint]);
      }
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const toggleLikes = () =>
    setSettings((prev) => ({ ...prev, likesVisible: !prev.likesVisible }));

  const toggleReplies = () =>
    setSettings((prev) => ({ ...prev, repliesAllowed: !prev.repliesAllowed }));

  const togglePublicReplies = () =>
    setSettings((prev) => ({ ...prev, publicReplies: !prev.publicReplies }));

  const copyLink = (path, label) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${path}`;
    navigator.clipboard
      ?.writeText(url)
      .then(() => toast.success(`${label} copied`))
      .catch(() => toast.error("Copy failed"));
  };

  const shareProfile = () =>
    copyLink(`/profile/${profile?.username}`, "Profile link");
  const sharePost = (id) => copyLink(`/thought/${id}`, "Thought link");

  const handleUnsave = async (thoughtId) => {
    try {
      const res = await fetch(`/api/save?thoughtId=${thoughtId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to unsave");
      setSavedPosts(savedPosts.filter((s) => s.thoughtId !== thoughtId));
      toast.success("Removed from saves");
    } catch (error) {
      toast.error("Failed to unsave");
    }
  };

  if (isLoading) {
    return (
      <div className={css.app}>
        <div className={css.col}>
          <Header css={css} hideSearch showCreate />
          <main className={css.profile} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p>Loading profile...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={css.app}>
        <div className={css.col}>
          <Header css={css} hideSearch showCreate />
          <main className={css.profile} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p>Profile not found</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={css.app}>
      <div className={css.col}>
        <Header css={css} hideSearch showCreate />
        <main className={`${css.profile}`}>
          {/* PROFILE HERO SECTION - SafeSpace Style */}
          <section className={css.profile_hero}>
            <div className={css.profile_identity}>
              <div className={css.profile_avatar}>
                <Image
                  src="/avatar.png"
                  width={80}
                  height={80}
                  alt={profile.name || "User avatar"}
                  style={{ borderRadius: 18, objectFit: "cover" }}
                />
              </div>
              <div className={css.profile_headings}>
                <p className={css.profile_handle}>@{profile.username}</p>
                <h1>{profile.name}</h1>
                <p className={css.profile_mindset}>{profile.mindset || "No mindset set"}</p>
                <p className={css.profile_about}>{profile.about || "Share your mindset"}</p>
                <div className={css.profile_chips}>
                  <span>{view === "public" ? "🌍 Public" : "🔒 Private"}</span>
                  <span>{posts.length} Thought{posts.length !== 1 ? "s" : ""}</span>
                  <span>{likedPosts.length} Pawprint{likedPosts.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>

            <div className={css.profile_controls}>
              <div className={css.profile_toggle_group}>
                <button onClick={() => setView(view === "public" ? "private" : "public")}>
                  {view === "public" ? <Eye /> : <EyeOff />}
                  <div>
                    <span>{view === "public" ? "Public profile" : "Private profile"}</span>
                    <small>
                      {view === "public"
                        ? "Visible to anyone with the link"
                        : "Only you can view it now"}
                    </small>
                  </div>
                </button>
                <button onClick={toggleLikes}>
                  {settings.likesVisible ? <Unlock /> : <Lock />}
                  <div>
                    <span>{settings.likesVisible ? "Show pawprints" : "Hide pawprints"}</span>
                    <small>Keep appreciation silent if you prefer</small>
                  </div>
                </button>
              </div>
              <div className={css.profile_actions}>
                <button onClick={shareProfile}>
                  <Share2 />
                  <span>Share profile</span>
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className={css.btn_primary}
                >
                  <Plus size={18} />
                  <span>New thought</span>
                </button>
              </div>
            </div>
          </section>

          {/* ACTIVITY HEATMAP */}
          <section className={css.activity_section}>
            <ActivityHeatmap
              css={css}
              events={[
                // posts createdAt
                ...posts.map((p) => p.createdAt).filter(Boolean),
                // likes (pawprints)
                ...likedPosts.map((p) => p.createdAt).filter(Boolean),
                // saved
                ...savedPosts.map((s) => s.createdAt).filter(Boolean),
              ]}
              weeks={12}
              title="Activity"
            />
          </section>

          {/* TABS - My Thoughts & My Pawprints */}
          <section className={css.profile_tabs}>
            <button
              className={`${css.tab_btn} ${activeTab === "thoughts" ? css.active : ""}`}
              onClick={() => setActiveTab("thoughts")}
            >
              My Thoughts ({posts.length})
            </button>
            <button
              className={`${css.tab_btn} ${activeTab === "prints" ? css.active : ""}`}
              onClick={() => setActiveTab("prints")}
            >
              My Pawprints ({likedPosts.length})
            </button>
            <button
              className={`${css.tab_btn} ${activeTab === "saved" ? css.active : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              Saved ({savedPosts.length})
            </button>
          </section>

          {/* THOUGHTS TAB */}
          {activeTab === "thoughts" && (
            <section className={css.profile_posts}>
              {posts.length === 0 ? (
                <div className={css.empty_state}>
                  <p>No thoughts yet. Share your first one! 🌿</p>
                </div>
              ) : (
                <div className={`${css.masonry} ${css.profile_masonry}`}>
                  {posts.map((post) => (
                    <div key={post._id} className={css.profile_thought_card}>
                      <Thought data={post} css={css} />
                      <div className={css.profile_thought_actions}>
                        <button onClick={() => sharePost(post._id)}>
                          <Copy />
                          <span>Share</span>
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className={css.btn_danger}
                        >
                          Delete
                        </button>
                        <span className={css.profile_privacy_badge}>
                          {post.isPublic ? "🌍 Public" : "🔒 Private"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* PAWPRINTS TAB */}
          {activeTab === "prints" && (
            <section className={css.profile_posts}>
              {likedPosts.length === 0 ? (
                <div className={css.empty_state}>
                  <p>No pawprints yet. Start appreciating thoughts! 🐾</p>
                </div>
              ) : (
                <div className={`${css.masonry} ${css.profile_masonry}`}>
                  {likedPosts.map((pawprint) => (
                    <div
                      key={pawprint._id}
                      className={css.profile_thought_card}
                    >
                      {/* Display the thought that was liked */}
                      <Thought data={pawprint.thoughtId || pawprint} css={css} />
                      <div className={css.profile_thought_actions}>
                        <button
                          onClick={() =>
                            handleLikePaw(pawprint.thoughtId)
                          }
                          className={css.btn_danger}
                        >
                          <Heart size={16} />
                          Unlike
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SAVED TAB */}
          {activeTab === "saved" && (
            <section className={css.profile_posts}>
              {savedPosts.length === 0 ? (
                <div className={css.empty_state}>
                  <p>No saved thoughts yet. Bookmark your favorites! 📌</p>
                </div>
              ) : (
                <div className={`${css.masonry} ${css.profile_masonry}`}>
                  {savedPosts.map((s) => (
                    <div key={s._id} className={css.profile_thought_card}>
                      <Thought data={s.thoughtId || s} css={css} />
                      <div className={css.profile_thought_actions}>
                        <button
                          onClick={() => handleUnsave(s.thoughtId)}
                          className={css.btn_danger}
                        >
                          <Bookmark size={16} />
                          Unsave
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {/* CREATE THOUGHT MODAL */}
      <CreateThoughtModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          // Refresh posts
          fetch(`/api/thoughts?userId=${profile._id}`)
            .then((res) => res.json())
            .then((data) => setPosts(data.data || []))
            .catch(console.error);
        }}
      />
    </div>
  );
};

export default ProfilePage;