"use client"
import React from 'react'
import css from '../app/app.module.sass'

const PandaLoader = ({ message = "Finding your quiet space..." }) => {
    return (
        <div className={css.panda_loader_container}>
            <svg 
                width="80" 
                height="80" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={css.panda_svg}
            >
                {/* Panda face - minimalist silhouette */}
                <circle cx="50" cy="50" r="30" fill="var(--text-color)" opacity="0.9"/>
                
                {/* Ears */}
                <circle cx="30" cy="30" r="12" fill="var(--text-color)" opacity="0.9"/>
                <circle cx="70" cy="30" r="12" fill="var(--text-color)" opacity="0.9"/>
                
                {/* Eye patches */}
                <ellipse cx="40" cy="45" rx="8" ry="10" fill="var(--base-color)" opacity="0.95"/>
                <ellipse cx="60" cy="45" rx="8" ry="10" fill="var(--base-color)" opacity="0.95"/>
                
                {/* Eyes */}
                <circle cx="40" cy="46" r="3" fill="var(--text-color)">
                    <animate 
                        attributeName="r" 
                        values="3;3;1;3;3" 
                        dur="4s" 
                        repeatCount="indefinite"
                    />
                </circle>
                <circle cx="60" cy="46" r="3" fill="var(--text-color)">
                    <animate 
                        attributeName="r" 
                        values="3;3;1;3;3" 
                        dur="4s" 
                        repeatCount="indefinite"
                    />
                </circle>
                
                {/* Nose */}
                <ellipse cx="50" cy="58" rx="4" ry="3" fill="var(--base-color)" opacity="0.8"/>
            </svg>
            
            {message && (
                <p className={css.panda_loader_message}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default PandaLoader
