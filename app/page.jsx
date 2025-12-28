"use client"
import Header from '@/components/Header'
import css from "./app.module.sass"
import React, { useState, useMemo, useEffect } from 'react'
import Thought from '@/components/Thought'
import { useRouter } from 'next/navigation'

const SAMPLE_THOUGHTS = [
    {
        _id: '507f1f77bcf86cd799439011',
        content: 'Just finished a long day of coding. Sometimes the best solutions come when you take a break and come back with fresh eyes.',
        authorUsername: 'bamboo_coder',
        category: 'reflection',
        pawprints: 24,
        saves: 8,
        replies: 3,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439012',
        content: 'The forest teaches us patience. Not everything needs to grow at the same pace. 🌿',
        authorUsername: 'zen_panda',
        category: 'motivational',
        pawprints: 45,
        saves: 12,
        replies: 7,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439013',
        content: 'Coffee is 90% of my debugging strategy. The other 10% is actually understanding the code.',
        authorUsername: 'debug_life',
        category: 'reflection',
        pawprints: 156,
        saves: 34,
        replies: 21,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439014',
        content: 'Sometimes I think about how pandas just sit around eating bamboo and I realize that\'s the ultimate life goal.',
        authorUsername: 'lazy_dev',
        category: 'emotion',
        pawprints: 89,
        saves: 23,
        replies: 12,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439015',
        content: 'Trying to understand why my code works. If I don\'t understand it, neither will the next person.',
        authorUsername: 'code_explorer',
        category: 'reflection',
        pawprints: 67,
        saves: 18,
        replies: 9,
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439016',
        content: 'Just realized that my first programming language was actually HTML. We all start somewhere! 💪',
        authorUsername: 'web_wanderer',
        category: 'reflection',
        pawprints: 102,
        saves: 31,
        replies: 14,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439017',
        content: 'There\'s something magical about the moment when your code compiles without errors for the first time.',
        authorUsername: 'dev_dreams',
        category: 'motivational',
        pawprints: 234,
        saves: 56,
        replies: 29,
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439018',
        content: 'The best part about open source? Realizing someone out there had the same problem you\'re facing now.',
        authorUsername: 'community_hub',
        category: 'quote',
        pawprints: 78,
        saves: 22,
        replies: 11,
        createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439019',
        content: 'CSS is not a programming language, but it\'s definitely a love-hate relationship.',
        authorUsername: 'style_ninja',
        category: 'quote',
        pawprints: 145,
        saves: 38,
        replies: 18,
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901a',
        content: 'Found a bug I wrote 6 months ago. Pretty sure that was future me trying to teach current me a lesson.',
        authorUsername: 'past_me',
        category: 'reflection',
        pawprints: 198,
        saves: 47,
        replies: 24,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901b',
        content: 'Nothing beats the feeling of productivity on a Monday morning. Except for the feeling of Friday afternoon.',
        authorUsername: 'week_cycle',
        category: 'quote',
        pawprints: 87,
        saves: 26,
        replies: 13,
        createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901c',
        content: 'Refactoring code is like organizing your room. You think it only takes 30 minutes, but suddenly it\'s 3 hours.',
        authorUsername: 'time_warp',
        category: 'reflection',
        pawprints: 156,
        saves: 42,
        replies: 19,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901d',
        content: 'Learn to give before you take.',
        authorUsername: 'izmuhammadazib',
        category: 'quote',
        pawprints: 2430,
        saves: 20,
        replies: 5,
        createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901e',
        content: 'Be kind. It confuses the unkind.',
        authorUsername: 'izmuhammadazib',
        category: 'motivational',
        pawprints: 1730,
        saves: 15,
        replies: 8,
        createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943901f',
        content: 'Be careful whose opinions you internalize. Some judge you from their wounds, not your reality. Some attack because your confidence makes them feel insecure. Some distance themselves because your growth highlighted their comfort. Don\'t shrink. Don\'t bend. Move forward with the strength they never possessed.',
        authorUsername: 'depthscript',
        category: 'reflection',
        pawprints: 3890,
        saves: 31,
        replies: 42,
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439020',
        content: 'If it costs your mental health, it\'s too expensive.',
        authorUsername: 'codedbyfate',
        category: 'motivational',
        pawprints: 1880,
        saves: 7,
        replies: 3,
        createdAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439021',
        content: 'Better alone than badly accompanied.',
        authorUsername: 'solitude',
        category: 'emotion',
        pawprints: 2790,
        saves: 15,
        replies: 9,
        createdAt: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439022',
        content: 'Silence is the most honest reply.',
        authorUsername: 'azlan.codes',
        category: 'reflection',
        pawprints: 2585,
        saves: 11,
        replies: 6,
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439023',
        content: 'Walk alone until the right people catch up.',
        authorUsername: 'seeker',
        category: 'motivational',
        pawprints: 2677,
        saves: 22,
        replies: 14,
        createdAt: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439024',
        content: 'Growth is painful, but staying the same is deadly.',
        authorUsername: 'quetalpha',
        category: 'motivational',
        pawprints: 2407,
        saves: 22,
        replies: 18,
        createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439025',
        content: 'You owe loyalty only to those who earned it.',
        authorUsername: 'truthunter',
        category: 'quote',
        pawprints: 1877,
        saves: 10,
        replies: 7,
        createdAt: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439026',
        content: 'Head in private, grow in public.',
        authorUsername: 'wolfmind',
        category: 'reflection',
        pawprints: 1886,
        saves: 36,
        replies: 12,
        createdAt: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439027',
        content: 'Peace looks good on you.',
        authorUsername: 'silentwo',
        category: 'emotion',
        pawprints: 1930,
        saves: 8,
        replies: 4,
        createdAt: new Date(Date.now() - 46 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439028',
        content: 'One day you will understand why certain doors remained closed. Why people left without warning. Why opportunities slipped. Not because you were unworthy— but because life was protecting you from smaller destinies. Trust the timing. Trust the redirections.',
        authorUsername: 'soulmitter',
        category: 'reflection',
        pawprints: 3999,
        saves: 27,
        replies: 35,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd799439029',
        content: 'Your future deserves a stronger you.',
        authorUsername: 'life.engine',
        category: 'motivational',
        pawprints: 1950,
        saves: 6,
        replies: 2,
        createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943902a',
        content: 'Sometimes life doesn\'t break you to destroy you. It breaks you to rebuild parts of you that were never allowed to grow. You teach people so you can find yourself. You fall so you can rise differently. You get hurt so you can learn boundaries. You get ignored so you can stop seeking validation. You walk alone so you can hear your own heartbeat.',
        authorUsername: 'izmuhammadazib',
        category: 'reflection',
        pawprints: 5821,
        saves: 89,
        replies: 67,
        createdAt: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943902b',
        content: 'Not everyone deserves the unfiltered version of you.',
        authorUsername: 'exist.with.purpose',
        category: 'emotion',
        pawprints: 2641,
        saves: 14,
        replies: 9,
        createdAt: new Date(Date.now() - 54 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943902c',
        content: 'Weak ties break fast. Strong hearts don\'t.',
        authorUsername: 'inkedthoughts',
        category: 'quote',
        pawprints: 1204,
        saves: 8,
        replies: 3,
        createdAt: new Date(Date.now() - 56 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943902d',
        content: 'Not everyone deserves a seat in your life.',
        authorUsername: 'exist.with.purpose',
        category: 'emotion',
        pawprints: 2341,
        saves: 19,
        replies: 11,
        createdAt: new Date(Date.now() - 58 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943902e',
        content: 'A calm mind wins every battle.',
        authorUsername: 'codecdspirit',
        category: 'quote',
        pawprints: 1733,
        saves: 8,
        replies: 4,
        createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '507f1f77bcf86cd79943902f',
        content: 'Sometimes not reacting is the loudest reaction.',
        authorUsername: 'calmstorms',
        category: 'reflection',
        pawprints: 2544,
        saves: 17,
        replies: 8,
        createdAt: new Date(Date.now() - 62 * 60 * 60 * 1000).toISOString()
    }
];

// Mark samples so UI can avoid calling APIs for non-persistent items
const SAMPLES = SAMPLE_THOUGHTS.map(t => ({ ...t, isSample: true }));

const page = () => {
    const router = useRouter();
    const [allowRender, setAllowRender] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [showFocusMode, setShowFocusMode] = useState(false);
    const [newThought, setNewThought] = useState("");

    const [thoughts, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gate: only allow within current SPA session (no persistence on refresh)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!window.__npSessionAuthorized) {
            router.push('/welcome');
            return;
        }
        setAllowRender(true);
    }, [router]);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/thoughts?limit=50`);
                if (!res.ok) {
                    const err = await res.text();
                    console.error('API error:', res.status, err);
                    // Use sample thoughts as fallback
                    setThoughts(SAMPLES);
                    return;
                }
                const data = await res.json();
                console.log('Loaded thoughts:', data.data?.length || 0);
                // Combine API data with sample thoughts if API returns fewer than 12
                const apiThoughts = data.data || [];
                if (apiThoughts.length === 0) {
                    setThoughts(SAMPLE_THOUGHTS);
                } else if (apiThoughts.length < 12) {
                    setThoughts([...apiThoughts, ...SAMPLES.slice(apiThoughts.length)]);
                } else {
                    setThoughts(apiThoughts);
                }
            } catch (e) {
                console.error('Fetch error:', e);
                // Use sample thoughts as fallback on network error
                setThoughts(SAMPLES);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);
    
    const filteredThoughts = useMemo(() => {
        const byText = (t) => {
            if (!filterText.trim()) return true;
            const lower = filterText.toLowerCase();
            const content = (t.content || t.thought || '').toLowerCase();
            const author = (t.authorUsername || t.username || '').toLowerCase();
            return content.includes(lower) || author.includes(lower);
        };

        const byCategory = (t) => {
            if (filterCategory === 'all') return true;
            const cat = (t.category || 'uncategorized').toLowerCase();
            return cat === filterCategory.toLowerCase();
        };

        return thoughts.filter(t => byText(t) && byCategory(t));
    }, [filterText, filterCategory, thoughts]);

    if (!allowRender) return null;

    return (
        <div className={css.app}>
            <div className={css.col}>
                <Header 
                    css={css} 
                    onSearch={setFilterText} 
                    onCategoryChange={setFilterCategory}
                    onNewThought={() => setShowFocusMode(true)} 
                />
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