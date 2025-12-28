"use client"
import Header from '@/components/Header'
import css from "./app.module.sass"
import React, { useState, useMemo, useEffect } from 'react'
import Thought from '@/components/Thought'

const SAMPLE_THOUGHTS = [
    {
        _id: '507f1f77bcf86cd799439011',
        content: 'Just finished a long day of coding. Sometimes the best solutions come when you take a break and come back with fresh eyes.',
        authorUsername: 'bamboo_coder',
        pawprints: 24,
        saves: 8,
        replies: 3,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439012',
        content: 'The forest teaches us patience. Not everything needs to grow at the same pace. 🌿',
        authorUsername: 'zen_panda',
        pawprints: 45,
        saves: 12,
        replies: 7,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439013',
        content: 'Coffee is 90% of my debugging strategy. The other 10% is actually understanding the code.',
        authorUsername: 'debug_life',
        pawprints: 156,
        saves: 34,
        replies: 21,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439014',
        content: 'Sometimes I think about how pandas just sit around eating bamboo and I realize that\'s the ultimate life goal.',
        authorUsername: 'lazy_dev',
        pawprints: 89,
        saves: 23,
        replies: 12,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439015',
        content: 'Trying to understand why my code works. If I don\'t understand it, neither will the next person.',
        authorUsername: 'code_explorer',
        pawprints: 67,
        saves: 18,
        replies: 9,
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439016',
        content: 'Just realized that my first programming language was actually HTML. We all start somewhere! 💪',
        authorUsername: 'web_wanderer',
        pawprints: 102,
        saves: 31,
        replies: 14,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439017',
        content: 'There\'s something magical about the moment when your code compiles without errors for the first time.',
        authorUsername: 'dev_dreams',
        pawprints: 234,
        saves: 56,
        replies: 29,
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439018',
        content: 'The best part about open source? Realizing someone out there had the same problem you\'re facing now.',
        authorUsername: 'community_hub',
        pawprints: 78,
        saves: 22,
        replies: 11,
        createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439019',
        content: 'CSS is not a programming language, but it\'s definitely a love-hate relationship.',
        authorUsername: 'style_ninja',
        pawprints: 145,
        saves: 38,
        replies: 18,
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901a',
        content: 'Found a bug I wrote 6 months ago. Pretty sure that was future me trying to teach current me a lesson.',
        authorUsername: 'past_me',
        pawprints: 198,
        saves: 47,
        replies: 24,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901b',
        content: 'Nothing beats the feeling of productivity on a Monday morning. Except for the feeling of Friday afternoon.',
        authorUsername: 'week_cycle',
        pawprints: 87,
        saves: 26,
        replies: 13,
        createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901c',
        content: 'Refactoring code is like organizing your room. You think it only takes 30 minutes, but suddenly it\'s 3 hours.',
        authorUsername: 'time_warp',
        pawprints: 156,
        saves: 42,
        replies: 19,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
];

const page = () => {
    const [filterText, setFilterText] = useState("");
    const [showFocusMode, setShowFocusMode] = useState(false);
    const [newThought, setNewThought] = useState("");

    const [thoughts, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/thoughts?limit=50`);
                if (!res.ok) {
                    const err = await res.text();
                    console.error('API error:', res.status, err);
                    // Use sample thoughts as fallback
                    setThoughts(SAMPLE_THOUGHTS);
                    return;
                }
                const data = await res.json();
                console.log('Loaded thoughts:', data.data?.length || 0);
                // Combine API data with sample thoughts if API returns fewer than 12
                const apiThoughts = data.data || [];
                if (apiThoughts.length === 0) {
                    setThoughts(SAMPLE_THOUGHTS);
                } else if (apiThoughts.length < 12) {
                    setThoughts([...apiThoughts, ...SAMPLE_THOUGHTS.slice(apiThoughts.length)]);
                } else {
                    setThoughts(apiThoughts);
                }
            } catch (e) {
                console.error('Fetch error:', e);
                // Use sample thoughts as fallback on network error
                setThoughts(SAMPLE_THOUGHTS);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);
    
    const filteredThoughts = useMemo(() => {
        if (!filterText.trim()) return thoughts;
        const lower = filterText.toLowerCase();
        return thoughts.filter(t => {
            const content = (t.content || t.thought || '').toLowerCase();
            const author = (t.authorUsername || t.username || '').toLowerCase();
            return content.includes(lower) || author.includes(lower);
        });
    }, [filterText, thoughts]);

    return (
        <div className={css.app}>
            <div className={css.col}>
                <Header css={css} onSearch={setFilterText} onNewThought={() => setShowFocusMode(true)} />
                <main>
                    <div className={css.masonry}>
                        {loading ? (
                            <div className={css.empty_state}>
                                <p>Loading thoughts...</p>
                            </div>
                        ) : error ? (
                            <div className={css.empty_state}>
                                <p>Error: {error}</p>
                                <small>Check console for details</small>
                            </div>
                        ) : filteredThoughts.length > 0 ? (
                            filteredThoughts.map((thought, index) => (<Thought key={index} data={thought} css={css} />))
                        ) : (
                            <div className={css.empty_state}>
                                <p>The Forest is quiet today.<br/>Be the first to plant a thought.</p>
                                <small>— Every bamboo starts with a single seed —</small>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Focus Mode Overlay */}
            {showFocusMode && (
                <div className={css.focus_overlay} onClick={() => setShowFocusMode(false)}>
                    <div className={css.focus_container} onClick={(e) => e.stopPropagation()}>
                        <h2 className={css.focus_header}>Plant Your Thought</h2>
                        <textarea 
                            className={css.focus_textarea}
                            placeholder="Share what's unspoken..."
                            value={newThought}
                            onChange={(e) => setNewThought(e.target.value)}
                            autoFocus
                        />
                        <div className={css.focus_actions}>
                            <button className={css.focus_cancel} onClick={() => setShowFocusMode(false)}>
                                Cancel
                            </button>
                            <button className={css.focus_submit} onClick={async () => {
                                try {
                                    const res = await fetch('/api/thoughts', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ content: newThought })
                                    });
                                    if (res.status === 201) {
                                        const t = await res.json();
                                        setThoughts(prev => [t, ...prev]);
                                        setNewThought('');
                                        setShowFocusMode(false);
                                    } else if (res.status === 401) {
                                        alert('Please sign in to plant a thought');
                                    } else {
                                        alert('Failed to plant thought');
                                    }
                                } catch (e) {
                                    alert('Network error');
                                }
                            }}>
                                Plant Thought
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default page