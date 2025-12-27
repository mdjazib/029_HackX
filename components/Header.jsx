"use client"
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Avatar from './Avatar'

const Header = ({ css, onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch?.(value);
    };

    return (
        <header className={css.header}>
            <Link href={'/'} className={css.logo}>Nice Panda</Link>
            <div className={css.search}>
                <Search />
                <input 
                    type="text" 
                    placeholder='Search thoughts or bamboos' 
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            <div className={css.header_nav}>
                <Link href={'/about'} className={css.nav_link}>About</Link>
            </div>
            <div className={css.cta}>
                <Link href={'/profile?draft=new'} className={css.createpostbtn} title="New Thought"><Plus /></Link>
                <Avatar css={css} url={'/profile'} />
            </div>
        </header>
    )
}

export default Header