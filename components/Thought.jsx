"use client"
import { PawPrint, Reply, Share } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

const Thought = ({ key, data, css }) => {
    const router = useRouter();
    return (
        <div key={key} className={css.thought}>
            <div className={css.postheader}>
                <Link href={`/${data.username}`}>{data.username}</Link>
                <Reply />
            </div>
            <p>{data.thought}</p>
            <div className={css.cta}>
                <div className={css.btn}>
                    <PawPrint /><span>{data.paws}</span>
                </div>
                <div className={css.btn}>
                    <Share /><span>{data.shares}</span>
                </div>
            </div>
        </div>
    )
}

export default Thought