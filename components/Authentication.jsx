"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import css from "../app/app.module.sass";
import { HatGlasses } from 'lucide-react';
import { useStore } from '@/useStore';
import Splash from './Splash';

const Authentication = ({ children }) => {
    const { setFingerprint } = useStore();
    const pathname = usePathname();
    const [logout, setLogout] = useState(false);
    const [authorised, setAuthorised] = useState(pathname === "/auth" ? true : false);
    const [error, setError] = useState(false);
    const authenticate = () => {
        const fpPromise = FingerprintJS.load();
        (async () => {
            try {
                setError(false);
                const fp = await fpPromise;
                const result = await fp.get();
                const visitorId = result.visitorId;
                setFingerprint(visitorId);
                const response = await axios.get("/api/verify", { headers: { fingerprint: visitorId } });
                response.status === 200 ? setAuthorised(true) : [setAuthorised(false), setError(true)];
            } catch (error) {
                toast.error(error.response.statusText);
                setAuthorised(false);
                setError(true);
            }
        })();
    }
    useEffect(() => {
        if (pathname !== "/auth") {
            authenticate();
            document.addEventListener("visibilitychange", authenticate);
            window.addEventListener("focus", authenticate);
            window.addEventListener("mouseenter", authenticate);
            return () => {
                document.removeEventListener("visibilitychange", authenticate);
                window.removeEventListener("focus", authenticate);
                window.removeEventListener("mouseenter", authenticate);
            };
        }
    }, [pathname]);
    const logMeOut = async () => {
        try {
            setLogout(true);
            const response = await axios.post("/api/logout");
            response.status === 200 ? window.location.assign("/auth") : setLogout(false);
        } catch (error) {
            toast.error(error.response.statusText);
            setLogout(false);
        }
    }
    return (
        <root>
            {
                authorised ? children : error ?
                    <div className={css.crash}>
                        <HatGlasses />
                        <h1>Something went suspicious!</h1>
                        <div className={css.btn} onClick={authenticate}>Retry</div>
                        <div className={css.btn} onClick={logMeOut}>{logout ? <><div className="loading"></div><span>Logging out...</span></> : <span>Log out</span>}</div>
                    </div> : <Splash />
            }
        </root>
    )
}

export default Authentication