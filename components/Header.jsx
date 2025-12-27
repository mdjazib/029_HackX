"use client"
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Avatar from './Avatar'

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

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch?.(value);
    };

    const handleNewThought = (e) => {
        e.preventDefault();
        if (onNewThought) {
            onNewThought();
        } else {
            // Fallback: navigate to profile
            window.location.href = '/profile';
        }
    };

    return (
        <header className={css.header}>
            <Link href={'/'} className={css.logo}>Nice Panda</Link>
            <div className={css.search}>
                <Search />
                <input 
                    type="text" 
                    placeholder='Seek a thought, find a soul...' 
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            <div className={css.header_nav}>
                <Link href={'/about'} className={css.nav_link}>About</Link>
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