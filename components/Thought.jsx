"use client"
import { PawPrint, Bookmark } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { playPawSound } from '@/lib/sound'
import { toast } from 'sonner'

const Thought = ({ data, css }) => {
    const [pawCount, setPawCount] = useState(data.pawprints ?? data.paws ?? 0);
    const [hasPawed, setHasPawed] = useState(false);
    const [saveCount, setSaveCount] = useState(data.saves ?? 0);
    const [hasSaved, setHasSaved] = useState(false);

    const handlePawClick = async () => {
        try {
            // Optimistic update
            if (!hasPawed) {
                setPawCount(prev => prev + 1);
                setHasPawed(true);
                playPawSound();
                toast.success('Pawprint left 🐾', { duration: 1500 });
            } else {
                setPawCount(prev => Math.max(0, prev - 1));
                setHasPawed(false);
                toast.success('Pawprint removed', { duration: 1500 });
            }

            // Try to sync with API
            const method = hasPawed ? 'DELETE' : 'POST';
            const query = hasPawed ? `?thoughtId=${data._id}` : '';
            const res = await fetch(`/api/pawprint${query}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: method === 'POST' ? JSON.stringify({ thoughtId: data._id }) : undefined
            });

            if (!res.ok && res.status !== 409) {
                console.warn('Pawprint API response:', res.status);
            }
        } catch (e) {
            console.error('Pawprint error:', e);
        }
    };

    const handleSaveClick = async () => {
        try {
            // Optimistic update
            if (!hasSaved) {
                setSaveCount(prev => prev + 1);
                setHasSaved(true);
                toast.success('Saved to your bamboo', { duration: 1500 });
            } else {
                setSaveCount(prev => Math.max(0, prev - 1));
                setHasSaved(false);
                toast.success('Removed from saves', { duration: 1500 });
            }

            // Try to sync with API
            const method = hasSaved ? 'DELETE' : 'POST';
            const query = hasSaved ? `?thoughtId=${data._id}` : '';
            const res = await fetch(`/api/save${query}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: method === 'POST' ? JSON.stringify({ thoughtId: data._id }) : undefined
            });

            if (!res.ok && res.status !== 409) {
                console.warn('Save API response:', res.status);
            }
        } catch (e) {
            console.error('Save error:', e);
        }
    };

    return (
        <div className={css.thought}>
            <div className={css.postheader}>
                <Link href={`/@${data.authorUsername || data.username}`}>{data.authorUsername || data.username}</Link>
            </div>
            <p>{data.content || data.thought}</p>
            <div className={css.cta}>
                <button 
                    className={`${css.btn} ${hasPawed ? css.btn_active : ''}`} 
                    onClick={handlePawClick}
                    type="button"
                    title="Leave a pawprint"
                >
                    <PawPrint style={{ fill: hasPawed ? 'currentColor' : 'none' }} />
                    <span className={css.paw_label}>{pawCount}</span>
                </button>
                <button 
                    className={`${css.btn} ${hasSaved ? css.btn_active : ''}`}
                    onClick={handleSaveClick}
                    type="button"
                    title="Save this thought"
                >
                    <Bookmark style={{ fill: hasSaved ? 'currentColor' : 'none' }} />
                    <span>{saveCount}</span>
                </button>
            </div>
        </div>
    )
}
export default Thought