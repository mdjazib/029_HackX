"use client"
import React from 'react'
import { ArrowRight, Leaf, Lock, MessageCircle, Users } from 'lucide-react'
import Link from 'next/link'
import css from "./landing.module.sass"

const LandingPage = () => {
  return (
    <div className={css.landing}>
      {/* Hero */}
      <section className={css.hero}>
        <div className={css.hero_content}>
          <div className={css.hero_logo}>🐼</div>
          <h1>Nice Panda</h1>
          <p className={css.tagline}>Your Thoughts belong here.</p>
          <p className={css.subtitle}>
            A calm space for honest words. No followers. No noise. Just truth.
          </p>
          <div className={css.cta_group}>
            <Link href="/auth" className={css.cta_primary}>
              Enter the Forest <ArrowRight size={16} />
            </Link>
            <Link href="/about" className={css.cta_secondary}>
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={css.philosophy}>
        <div className={css.philosophy_container}>
          <h2>Why Nice Panda?</h2>
          <p className={css.philosophy_intro}>
            Modern social platforms reward appearance, exaggeration, and attention-seeking. 
            This creates anxiety, comparison, and discourages honest expression.
          </p>
          <p className={css.philosophy_intro}>
            Nice Panda is different.
          </p>

          <div className={css.pillars}>
            <div className={css.pillar}>
              <div className={css.pillar_icon}>💭</div>
              <h3>Text Only</h3>
              <p>Words, not images. Thought, not performance.</p>
            </div>
            <div className={css.pillar}>
              <div className={css.pillar_icon}>🌿</div>
              <h3>No Followers</h3>
              <p>You are a Bamboo, not a celebrity. Growth happens quietly.</p>
            </div>
            <div className={css.pillar}>
              <div className={css.pillar_icon}>🤐</div>
              <h3>No Comments</h3>
              <p>Silence can be respectful. Appreciation, not arguments.</p>
            </div>
            <div className={css.pillar}>
              <div className={css.pillar_icon}>🐾</div>
              <h3>Pawprints, Not Metrics</h3>
              <p>Silent appreciation. No pressure to reply, engage, or perform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={css.how_it_works}>
        <div className={css.how_container}>
          <h2>How it Works</h2>
          <div className={css.steps}>
            <div className={css.step}>
              <div className={css.step_number}>1</div>
              <h3>Share a Thought</h3>
              <p>Write what you truly think. Poetry, quotes, reflections, raw emotions—no filters.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_number}>2</div>
              <h3>Browse the Forest</h3>
              <p>Discover honest thoughts in a masonry layout. Each Bamboo's voice, unique and unfiltered.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_number}>3</div>
              <h3>Leave a Pawprint 🐾</h3>
              <p>Silently appreciate a thought. No pressure to comment. Just genuine recognition.</p>
            </div>
            <div className={css.step}>
              <div className={css.step_number}>4</div>
              <h3>Control Your Mindset</h3>
              <p>Your profile is your mindset. Toggle visibility, hide metrics, own your space.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={css.features}>
        <div className={css.features_container}>
          <h2>Designed for the Real You</h2>
          <div className={css.features_grid}>
            <div className={css.feature_card}>
              <Lock size={24} />
              <h3>Your Control</h3>
              <p>Public or private. Show likes or hide them. Allow replies or close the door.</p>
            </div>
            <div className={css.feature_card}>
              <Leaf size={24} />
              <h3>Mindset Over Metrics</h3>
              <p>No algorithms pushing outrage. Just a calm feed of honest thoughts.</p>
            </div>
            <div className={css.feature_card}>
              <MessageCircle size={24} />
              <h3>Peace, Not Arguments</h3>
              <p>No comments. No debates. Just appreciation in the form of pawprints.</p>
            </div>
            <div className={css.feature_card}>
              <Users size={24} />
              <h3>A Quiet Community</h3>
              <p>You're not alone. Thousands of Bamboos writing truth, not performing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className={css.manifesto}>
        <div className={css.manifesto_content}>
          <h2>Our Manifesto</h2>
          <div className={css.manifesto_text}>
            <p>Not everything needs a reaction.</p>
            <p>Not every thought needs validation.</p>
            <p>Truth matters more than attention.</p>
            <p>Silence can be respectful.</p>
            <br />
            <p><strong>Nice Panda believes the internet needs calmer spaces.</strong></p>
            <p>Spaces where you can write to empty your head, not to impress the room.</p>
            <p>Where growth happens quietly, and authenticity is the only algorithm.</p>
            <br />
            <p className={css.manifesto_final}>
              Your Thoughts belong here. 🐼
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={css.footer_cta}>
        <h2>Ready to Join the Forest?</h2>
        <p>Share your first thought. No judgment. No noise. Just honesty.</p>
        <Link href="/auth" className={css.cta_large}>
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className={css.footer}>
        <div className={css.footer_content}>
          <div className={css.footer_section}>
            <h4>Nice Panda</h4>
            <p>A text-only social platform for honest thoughts.</p>
          </div>
          <div className={css.footer_section}>
            <h4>Quick Links</h4>
            <Link href="/about">About</Link>
            <Link href="/auth">Sign In</Link>
          </div>
          <div className={css.footer_section}>
            <h4>Our Values</h4>
            <p>Truth • Calm • Authenticity</p>
          </div>
        </div>
        <div className={css.footer_bottom}>
          <p>&copy; 2025 Nice Panda. Built for the quiet minds. 🐼</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
