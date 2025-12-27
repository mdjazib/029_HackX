"use client"
import { Plus, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Avatar from './Avatar'
import Create from './Create'

const Header = ({ css }) => {
    const [createModel, setCreateModel] = useState(false);
    return (
        <>
            <header className={css.header}>
                <Link href={"/"} className={css.logo}>Nice Panda</Link>
                <div className={css.search}>
                    <Search />
                    <input type="text" placeholder='Search' />
                </div>
                <div className={css.cta}>
                    <div className={css.createpostbtn} onClick={() => { setCreateModel(true) }}><Plus /></div>
                    <Avatar css={css} />
                </div>
            </header>
            {createModel ? <Create setCreateModel={setCreateModel} /> : <></>}
        </>
    )
}

export default Header