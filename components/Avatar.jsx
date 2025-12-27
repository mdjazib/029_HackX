import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Enhanced Bamboo stalk with dynamic growth visualization
const BambooAvatar = ({ growth = 3 }) => {
    // Growth level determines visual richness (1-10)
    const normalizedGrowth = Math.min(Math.max(growth, 1), 10);
    const segments = Math.ceil(normalizedGrowth / 2); // 1-5 segments
    const leafCount = normalizedGrowth >= 6 ? 4 : normalizedGrowth >= 4 ? 3 : 2;
    const stalkColor = `lch(${50 + normalizedGrowth * 2} 40 ${130 + normalizedGrowth * 2})`;
    
    return (
        <svg 
            width="30" 
            height="30" 
            viewBox="0 0 30 30" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ 
                color: stalkColor,
                filter: `drop-shadow(0 0 ${normalizedGrowth}px currentColor)`
            }}
        >
            {/* Main stalk with gradient */}
            <defs>
                <linearGradient id={`bambooGrad-${growth}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
                </linearGradient>
            </defs>
            
            <rect 
                x="13" 
                y={8 - segments} 
                width="4" 
                height={16 + segments * 2} 
                rx="2" 
                fill={`url(#bambooGrad-${growth})`}
                opacity="0.95"
            />
            
            {/* Bamboo segments (nodes) - more with growth */}
            {Array.from({ length: segments }).map((_, i) => (
                <React.Fragment key={i}>
                    <line 
                        x1="11" 
                        y1={10 + i * 4} 
                        x2="19" 
                        y2={10 + i * 4}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        opacity="0.8"
                    />
                    {/* Highlight on nodes */}
                    <line 
                        x1="13" 
                        y1={10 + i * 4} 
                        x2="17" 
                        y2={10 + i * 4}
                        stroke="white"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        opacity="0.3"
                    />
                </React.Fragment>
            ))}
            
            {/* Dynamic leaves based on growth */}
            {leafCount >= 1 && (
                <path 
                    d="M17 10 Q23 8 24 13 Q20 11 17 12" 
                    fill="currentColor" 
                    opacity="0.7"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 17 11"
                        to="5 17 11"
                        dur="3s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </path>
            )}
            
            {leafCount >= 2 && (
                <path 
                    d="M13 14 Q7 12 6 17 Q10 15 13 16" 
                    fill="currentColor" 
                    opacity="0.7"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 13 15"
                        to="-5 13 15"
                        dur="3.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </path>
            )}
            
            {leafCount >= 3 && (
                <path 
                    d="M17 18 Q23 16 24 21 Q20 19 17 20" 
                    fill="currentColor" 
                    opacity="0.6"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 17 19"
                        to="6 17 19"
                        dur="4s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </path>
            )}
            
            {leafCount >= 4 && (
                <path 
                    d="M13 22 Q7 20 6 25 Q10 23 13 24" 
                    fill="currentColor" 
                    opacity="0.5"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 13 23"
                        to="-7 13 23"
                        dur="4.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </path>
            )}
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