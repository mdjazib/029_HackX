import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Bamboo stalk representing growth and resilience
const BambooAvatar = ({ growth = 3 }) => {
    // Growth level determines number of segments and vibrance
    const segments = Math.min(growth, 5);
    
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--accent-color)' }}>
            {/* Main stalk */}
            <rect x="13" y="6" width="4" height="18" rx="2" fill="currentColor" opacity="0.9"/>
            
            {/* Bamboo segments (nodes) */}
            {Array.from({ length: segments }).map((_, i) => (
                <line 
                    key={i}
                    x1="11" 
                    y1={8 + i * 4} 
                    x2="19" 
                    y2={8 + i * 4}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                />
            ))}
            
            {/* Leaves */}
            <path d="M17 10 Q22 8 23 12 Q20 11 17 12" fill="currentColor" opacity="0.6"/>
            <path d="M13 14 Q8 12 7 16 Q10 15 13 16" fill="currentColor" opacity="0.6"/>
            {growth >= 4 && <path d="M17 18 Q22 16 23 20 Q20 19 17 20" fill="currentColor" opacity="0.5"/>}
        </svg>
    );
};

const Avatar = ({ css, img = "", url = "#", growth = 3 }) => {
    return (
        <Link href={url} className={css.avatar}>
            {
                img ? <Image src={"/avatar.png"} alt='user' width={50} height={50} /> :
                    <BambooAvatar growth={growth} />
            }
        </Link>
    )
}

export default Avatar