"use client"
import { Maximize2, PawPrint, Share } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { playPawSound } from '@/lib/sound'
import { toast } from 'sonner'

const Thought = ({ data, css }) => {
    const [pawCount, setPawCount] = useState(data.paws);
    const [hasPawed, setHasPawed] = useState(false);

    const handlePawClick = () => {
        if (hasPawed) {
            // Already pawed - remove pawprint
            setPawCount(prev => prev - 1);
            setHasPawed(false);
            toast.success('Pawprint removed', { duration: 1500 });
        } else {
            // Add pawprint
            playPawSound();
            setPawCount(prev => prev + 1);
            setHasPawed(true);
            toast.success('Pawprint left 🐾', { duration: 1500 });
        }
    };

    const handleShare = async () => {
        // Create shareable text
        const shareText = `"${data.thought}"\n\n— ${data.username} on Nice Panda`;
        
        // Try native share API first (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Thought from Nice Panda',
                    text: shareText,
                    url: window.location.origin
                });
                toast.success('Shared successfully!');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareText);
                }
            }
        } else {
            // Fallback to clipboard
            copyToClipboard(shareText);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Thought copied to clipboard!', { duration: 2000 });
        }).catch(() => {
            toast.error('Failed to copy');
        });
    };

    const handleExpand = () => {
        toast.info('Full thought view coming soon!', { duration: 1500 });
    };

    return (
        <div className={css.thought}>
            <div className={css.postheader}>
                <Link href={`/@${data.username}`}>{data.username}</Link>
                <Maximize2 onClick={handleExpand} style={{ cursor: 'pointer' }} />
            </div>
            <p>{data.thought}</p>
            <div className={css.cta}>
                <div 
                    className={`${css.btn} ${hasPawed ? css.btn_active : ''}`} 
                    onClick={handlePawClick}
                    style={{ cursor: 'pointer' }}
                >
                    <PawPrint style={{ fill: hasPawed ? 'currentColor' : 'none' }} />
                    <span className={css.paw_label}>{pawCount}</span>
                </div>
                <div 
                    className={css.btn} 
                    onClick={handleShare}
                    style={{ cursor: 'pointer' }}
                >
                    <Share /><span>{data.shares}</span>
                </div>
            </div>
        </div>
    )
}

export default Thought