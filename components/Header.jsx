"use client"
import { Plus, Search, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Avatar from './Avatar'
import { useRouter } from 'next/navigation'

// Simple bamboo SVG icon
const BambooIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L12 8 M12 10 L12 16 M12 18 L12 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M8 8 L16 8 M8 16 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 4 L14 4 M10 12 L14 12 M10 20 L14 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
)

const Header = ({ css, onSearch, onNewThought }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("keyword"); // "keyword" | "author"
    const [category, setCategory] = useState("all");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    const categories = ["all", "motivational", "poetry", "reflection", "creative-writing", "quote", "emotion"];

    // Debounced search
    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(() => performSearch(), 300);
        return () => clearTimeout(timer);
    }, [searchValue, searchType, category]);

    const performSearch = async () => {
        try {
            setIsSearching(true);
            const params = new URLSearchParams({
                type: searchType,
                query: searchValue,
                ...(category !== "all" && { category }),
                limit: "10"
            });

            const res = await fetch(`/api/search?${params}`);
            if (!res.ok) return;

            const data = await res.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleResultClick = (thoughtId) => {
        router.push(`/thought/${thoughtId}`);
        setSearchValue("");
        setSearchResults([]);
    };

    const handleNewThought = (e) => {
        e.preventDefault();
        if (onNewThought) {
            onNewThought();
        } else {
            window.location.href = '/profile';
        }
    };

    return (
        <header className={css.header}>
            <Link href={'/'} className={css.logo}>Nice Panda</Link>
            
            <div className={css.search_container}>
                <div className={css.search}>
                    <Search />
                    <input 
                        type="text" 
                        placeholder='Search thoughts or people...' 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowAdvanced(true)}
                    />
                    {searchValue && (
                        <button onClick={() => {
                            setSearchValue("");
                            setSearchResults([]);
                        }}>
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Advanced search options */}
                {showAdvanced && (
                    <div className={css.search_advanced}>
                        <div className={css.search_modes}>
                            <label>
                                <input 
                                    type="radio" 
                                    name="searchType" 
                                    value="keyword"
                                    checked={searchType === "keyword"}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />
                                <span>Search by content</span>
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="searchType" 
                                    value="author"
                                    checked={searchType === "author"}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />
                                <span>Search by author</span>
                            </label>
                        </div>

                        {searchType === "keyword" && (
                            <div className={css.search_categories}>
                                <label>Filter by category:</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === "all" ? "All categories" : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Search results dropdown */}
                        {searchValue && searchResults.length > 0 && (
                            <div className={css.search_results}>
                                {searchResults.map(result => (
                                    <button
                                        key={result._id}
                                        className={css.search_result_item}
                                        onClick={() => handleResultClick(result._id)}
                                    >
                                        <div className={css.result_text}>
                                            <p className={css.result_author}>
                                                {searchType === "author" 
                                                    ? `@${result.authorUsername}`
                                                    : <strong>{result.authorUsername}</strong>
                                                }
                                            </p>
                                            <p className={css.result_content}>{result.content.substring(0, 80)}...</p>
                                        </div>
                                        <span className={css.result_category}>{result.category}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {searchValue && searchResults.length === 0 && !isSearching && (
                            <div className={css.search_empty}>
                                <p>No thoughts found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={css.cta}>
                <button onClick={handleNewThought} className={css.createpostbtn} title="Plant a Thought">
                    <Plus />
                </button>
                <Link href={'/profile'} className={css.bamboo_icon} title="Your Bamboo">
                    <BambooIcon />
                </Link>
            </div>
        </header>
    )
}

export default Header