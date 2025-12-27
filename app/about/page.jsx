"use client"
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import css from "./about.module.sass"

const AboutPage = () => {
  return (
    <div className={css.about}>
      {/* Header */}
      <header className={css.about_header}>
        <Link href="/landing" className={css.back_btn}>
          <ArrowLeft size={20} />
          Back
        </Link>
      </header>

      {/* Hero */}
      <section className={css.hero}>
        <div className={css.hero_content}>
          <div className={css.hero_logo}>🐼</div>
          <h1>About Nice Panda</h1>
          <p>A calm, honest space for thoughts that matter.</p>
        </div>
      </section>

      {/* The Problem */}
      <section className={css.section}>
        <div className={css.section_container}>
          <h2>The Problem</h2>
          <p>
            Modern social platforms are designed to maximize engagement, not truth. They reward:
          </p>
          <ul>
            <li>Followers and popularity contests</li>
            <li>Comments that turn into arguments</li>
            <li>Images and filters over substance</li>
            <li>Fake lifestyles over real thoughts</li>
            <li>Performance over authenticity</li>
          </ul>
          <p>
            This creates <strong>anxiety, comparison, and silence</strong>—especially for writers, poets, thinkers, and quiet minds who want to share truth, not perform it.
          </p>
        </div>
      </section>

      {/* Our Solution */}
      <section className={css.section_alt}>
        <div className={css.section_container}>
          <h2>Our Solution</h2>
          <p>
            Nice Panda removes the parts that create toxicity. We focus on what matters: <strong>truth, creativity, and mindset.</strong>
          </p>
          <div className={css.comparison}>
            <div className={css.comparison_column}>
              <h3>Traditional Social Media</h3>
              <ul>
                <li>Followers & fame</li>
                <li>Comments & debates</li>
                <li>Images & filters</li>
                <li>Fake lifestyles</li>
                <li>Performance-driven</li>
              </ul>
            </div>
            <div className={css.vs}>VS</div>
            <div className={css.comparison_column}>
              <h3>Nice Panda</h3>
              <ul>
                <li>No followers</li>
                <li>No comments</li>
                <li>Text only</li>
                <li>Real thoughts</li>
                <li>Expression-driven</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Terminology */}
      <section className={css.section}>
        <div className={css.section_container}>
          <h2>Our Language</h2>
          <p>Every element of Nice Panda carries meaning:</p>
          <div className={css.terminology}>
            <div className={css.term}>
              <h3>🐼 Panda</h3>
              <p>The symbol of calm, strength, and quiet wisdom.</p>
            </div>
            <div className={css.term}>
              <h3>🌿 Bamboo</h3>
              <p>Each user is a Bamboo—steady, resilient, growing quietly.</p>
            </div>
            <div className={css.term}>
              <h3>💭 Thought</h3>
              <p>Every post is a Thought—poetry, quotes, reflections, raw emotions.</p>
            </div>
            <div className={css.term}>
              <h3>🌲 Forest</h3>
              <p>The feed is the Forest—a masonry of honest thoughts, a place to wander and discover.</p>
            </div>
            <div className={css.term}>
              <h3>🐾 Pawprint</h3>
              <p>Silent appreciation. Not a comment, just genuine recognition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={css.section_alt}>
        <div className={css.section_container}>
          <h2>Our Philosophy</h2>
          <div className={css.philosophy_list}>
            <div className={css.philosophy_item}>
              <h3>Not everything needs a reaction.</h3>
              <p>Some thoughts are meant to be heard, not replied to.</p>
            </div>
            <div className={css.philosophy_item}>
              <h3>Not every thought needs validation.</h3>
              <p>Truth stands on its own, without metrics.</p>
            </div>
            <div className={css.philosophy_item}>
              <h3>Truth matters more than attention.</h3>
              <p>We value depth over virality.</p>
            </div>
            <div className={css.philosophy_item}>
              <h3>Silence can be respectful.</h3>
              <p>You don't have to comment to show you care.</p>
            </div>
            <div className={css.philosophy_item}>
              <h3>Mindset is your true home.</h3>
              <p>Your profile represents how you think, not how you look.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={css.section}>
        <div className={css.section_container}>
          <h2>How It Works</h2>
          <div className={css.steps}>
            <div className={css.step}>
              <div className={css.step_num}>1</div>
              <h3>Sign in (no passwords)</h3>
              <p>Magic link via email. Your device is verified. Simple.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_num}>2</div>
              <h3>Share a Thought</h3>
              <p>Write what you truly think. Your mindset, raw and unfiltered.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_num}>3</div>
              <h3>Browse the Forest</h3>
              <p>Discover honest thoughts in a beautiful masonry layout.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_num}>4</div>
              <h3>Leave Pawprints</h3>
              <p>Appreciate in silence. No pressure to comment or engage.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_num}>5</div>
              <h3>Control Your Space</h3>
              <p>Your profile, your rules. Public or private. Show or hide metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={css.section_alt}>
        <div className={css.section_container}>
          <h2>Our Core Values</h2>
          <div className={css.values}>
            <div className={css.value}>
              <div className={css.value_icon}>🎯</div>
              <h3>Authenticity</h3>
              <p>No algorithms promoting outrage. Just real thoughts.</p>
            </div>
            <div className={css.value}>
              <div className={css.value_icon}>🕊️</div>
              <h3>Calm</h3>
              <p>Designed for peace. No notifications pushing you back in.</p>
            </div>
            <div className={css.value}>
              <div className={css.value_icon}>🔐</div>
              <h3>Privacy</h3>
              <p>Your control. Your data. Your choice on visibility and metrics.</p>
            </div>
            <div className={css.value}>
              <div className={css.value_icon}>🌱</div>
              <h3>Growth</h3>
              <p>Real growth happens quietly. We celebrate mindset, not clout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who's It For */}
      <section className={css.section}>
        <div className={css.section_container}>
          <h2>Who This Is For</h2>
          <p>Nice Panda is for anyone who:</p>
          <ul>
            <li>Wants to write without pressure or judgment</li>
            <li>Values poetry, quotes, and reflections</li>
            <li>Enjoys honesty over performance</li>
            <li>Seeks a calm, quiet online space</li>
            <li>Believes truth matters more than attention</li>
            <li>Wants to share thoughts without replies</li>
            <li>Is tired of algorithms and fake engagement</li>
          </ul>
        </div>
      </section>

      {/* Status */}
      <section className={css.section_alt}>
        <div className={css.section_container}>
          <h2>Current Status</h2>
          <p>🟡 <strong>Hackathon Prototype / Early Development</strong></p>
          <p>
            Nice Panda started as a hackathon idea and is actively being built. We're working towards a public beta 
            where you'll be able to share your first Thought and help shape the future of this platform.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={css.cta_section}>
        <h2>Ready to Join?</h2>
        <p>Become a Bamboo in the Forest. Share your thoughts. Find your calm.</p>
        <Link href="/auth" className={css.cta_btn}>
          Enter the Forest →
        </Link>
      </section>

      {/* Footer */}
      <footer className={css.footer}>
        <p>&copy; 2025 Nice Panda. Built for the quiet minds. 🐼</p>
      </footer>
    </div>
  )
}

export default AboutPage
