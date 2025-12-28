"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, LogIn } from 'lucide-react'
import css from "./welcome.module.sass"
import { toast } from 'sonner'

const WelcomePage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEnterForest = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error('Please enter an email');
            return;
        }

        if (email !== 'abc@gmail.com') {
            toast.error('For now, use abc@gmail.com to enter');
            return;
        }

        try {
            setLoading(true);
            // Simulate brief loading
            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    window.__npSessionAuthorized = true; // in-memory only
                }
                router.push('/profile');
            }, 500);
        } catch (error) {
            toast.error('Failed to enter');
            setLoading(false);
        }
    };

    const handleGuestMode = () => {
        if (typeof window !== 'undefined') {
            window.__npSessionAuthorized = true; // in-memory only
        }
        router.push('/');
    };

    return (
        <div className={css.welcome_container}>
            <div className={css.welcome_card}>
                <div className={css.inner}>
                    <div className={css.logo_section}>
                        <div className={css.panda_logo}>🐼</div>
                        <h1>NICEPANDA</h1>
                        <p className={css.tagline}>A Sanctuary for the Quiet Mind</p>
                    </div>

                    <form onSubmit={handleEnterForest} className={css.form}>
                        <div className={css.input_group}>
                            <Mail size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                autoFocus
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={css.enter_btn}
                        >
                            {loading ? 'Entering...' : 'Enter the Forest'}
                        </button>
                    </form>

                    <div className={css.divider}>
                        <span>or</span>
                    </div>

                    <button 
                        onClick={handleGuestMode}
                        className={css.guest_btn}
                    >
                        <LogIn size={18} />
                        Continue as Guest
                    </button>

                    <p className={css.hint}>
                        Demo email: <code>abc@gmail.com</code>
                    </p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className={css.bamboo_left}></div>
            <div className={css.bamboo_right}></div>
        </div>
    );
};

export default WelcomePage;
