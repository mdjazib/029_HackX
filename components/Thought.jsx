"use client"
import { Maximize2, PawPrint, Share } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Thought = ({ data, css }) => {
    return (
        <div className={css.thought}>
            <div className={css.postheader}>
                <Link href={'#'}>{data.username}</Link>
                <Maximize2 />
            </div>
            <p>{data.thought}</p>
            <div className={css.cta}>
                <div className={css.btn}>
                    <PawPrint /><span className={css.paw_label}>{data.paws}</span>
                </div>
                <div className={css.btn}>
                    <Share /><span>{data.shares}</span>
                </div>
            </div>
        </div>
    )
}

export default Thought