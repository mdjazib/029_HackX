"use client"
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Activity, Copy, Eye, EyeOff, Lock, Share2, Unlock } from "lucide-react";
import Header from "@/components/Header";
import Thought from "@/components/Thought";
import css from "../app.module.sass";

const profileSnapshot = {
  name: "Avery Noor",
  handle: "mindfully-quiet",
  mindset: "Calm > Clout",
  about:
    "I write to empty my head, not to impress the room. No followers, no noise—just honest thoughts.",
  avatarSeed: "N",
  view: "public", // public | private
  settings: {
    likesVisible: false, // hidden likes toggle
    repliesAllowed: true,
    publicReplies: false,
  },
  mood: {
    calm: 72,
    reflective: 64,
    restless: 18,
    decisive: 41,
    grateful: 55,
  },
};

const posts = [
  {
    id: "p1",
    username: profileSnapshot.handle,
    thought: "Leaving rooms quietly is also self-respect.",
    paws: 129,
    shares: 4,
  },
  {
    id: "p2",
    username: profileSnapshot.handle,
    thought: "Honesty costs you audiences. Peace refunds the cost.",
    paws: 187,
    shares: 7,
  },
  {
    id: "p3",
    username: profileSnapshot.handle,
    thought: `Mindset is the only algorithm I follow.`,
    paws: 203,
    shares: 6,
  },
  {
    id: "p4",
    username: profileSnapshot.handle,
    thought: `Some replies are better as private notes than public theater.`,
    paws: 98,
    shares: 3,
  },
];

const ProfilePage = () => {
  const [view, setView] = useState(profileSnapshot.view);
  const [settings, setSettings] = useState(profileSnapshot.settings);

  const moodSeries = useMemo(
    () =>
      Object.entries(profileSnapshot.mood).map(([label, value]) => ({
        label,
        value,
      })),
    []
  );

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

  const shareProfile = () => copyLink(`/profile/${profileSnapshot.handle}`, "Profile link");
  const sharePost = (id) => copyLink(`/thought/${id}`, "Thought link");

  return (
    <div className={css.app}>
      <div className={css.col}>
        <Header css={css} />
        <main className={`${css.profile}`}>
          <section className={css.profile_hero}>
            <div className={css.profile_identity}>
              <div className={css.profile_avatar}>{profileSnapshot.avatarSeed}</div>
              <div className={css.profile_headings}>
                <p className={css.profile_handle}>@{profileSnapshot.handle}</p>
                <h1>{profileSnapshot.name}</h1>
                <p className={css.profile_mindset}>{profileSnapshot.mindset}</p>
                <p className={css.profile_about}>{profileSnapshot.about}</p>
                <div className={css.profile_chips}>
                  <span>{view === "public" ? "Public view" : "Private view"}</span>
                  <span>{settings.publicReplies ? "Replies show on profile" : "Replies stay private"}</span>
                  <span>{settings.likesVisible ? "Likes visible" : "Likes hidden"}</span>
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
                    <span>{settings.likesVisible ? "Show likes" : "Hide likes"}</span>
                    <small>Keep appreciation silent if you prefer</small>
                  </div>
                </button>
                <button onClick={toggleReplies}>
                  <Activity />
                  <div>
                    <span>{settings.repliesAllowed ? "Replies allowed" : "Replies closed"}</span>
                    <small>Switch off to pause responses</small>
                  </div>
                </button>
                <button disabled={!settings.repliesAllowed} onClick={togglePublicReplies}>
                  {settings.publicReplies ? <Eye /> : <EyeOff />}
                  <div>
                    <span>
                      {settings.publicReplies ? "Replies are public" : "Replies are private"}
                    </span>
                    <small>Choose where replies live</small>
                  </div>
                </button>
              </div>
              <div className={css.profile_actions}>
                <button onClick={shareProfile}>
                  <Share2 />
                  <span>Share profile</span>
                </button>
                <button onClick={() => copyLink(`/draft`, "New thought draft link")}>
                  <Copy />
                  <span>New thought</span>
                </button>
              </div>
            </div>
          </section>

          <section className={css.profile_moodpanel}>
            <div className={css.section_header}>
              <div>
                <p>Mind swings</p>
                <h3>Mood graph (last week)</h3>
              </div>
              <span>Numbers stay private by default</span>
            </div>
            <div className={css.mood_bars}>
              {moodSeries.map(({ label, value }) => (
                <div key={label} className={css.mood_bar}>
                  <div className={css.mood_label}>{label}</div>
                  <div className={css.mood_track}>
                    <div className={css.mood_fill} style={{ width: `${value}%` }} />
                  </div>
                  <div className={css.mood_value}>{value}%</div>
                </div>
              ))}
            </div>
          </section>

          <section className={css.profile_posts}>
            <div className={css.section_header}>
              <div>
                <p>Thoughts</p>
                <h3>Latest drops</h3>
              </div>
              <span>Share individual posts without showing likes</span>
            </div>
            <div className={`${css.masonry} ${css.profile_masonry}`}>
              {posts.map((post) => (
                <div key={post.id} className={css.profile_thought_card}>
                  <Thought data={post} css={css} />
                  <div className={css.profile_thought_actions}>
                    <button onClick={() => sharePost(post.id)}>
                      <Copy />
                      <span>Share this post</span>
                    </button>
                    <span className={css.profile_privacy_badge}>
                      {settings.likesVisible ? "Likes on" : "Likes hidden"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;