"use client"
import { Plus, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

const Header = ({ css }) => {
    return (
        <header className={css.header}>
            <Link href={"/"} className={css.logo}>Nice Panda</Link>
            <div className={css.search}>
                <Search />
                <input type="text" placeholder='Search' />
            </div>
            <div className={css.cta}>
                <div className={css.createpostbtn}><Plus /></div>
                <Avatar css={css} />
            </div>
        </header>
    )
}

export default Header