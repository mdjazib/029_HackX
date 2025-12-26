"use client"
import React, { useEffect, useState } from 'react'
import css from "./../app.module.sass"
import { useRouter, useSearchParams } from 'next/navigation'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Bug } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import errors from '@/errors'

const Content = () => {
    const router = useRouter();
    const params = useSearchParams();
    const token = params.get("token");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(true);
    const [error, setError] = useState(false);
    const [device, setDevice] = useState("");
    const [width, setWidth] = useState("");
    useEffect(() => {
        const fpPromise = FingerprintJS.load();
        (async () => {
            const fp = await fpPromise;
            const result = await fp.get();
            const visitorId = result.visitorId;
            setWidth(window.innerWidth);
            setDevice(visitorId);
            if (token) {
                (async () => {
                    try {
                        const response = await axios.get(`/api/auth?token=${token}&fingerprint=${visitorId}`);
                        response.status === 200 ? router.push("/") : setError(true);
                    } catch (error) {
                        toast.error(error.response.statusText);
                        setError(true);
                    }
                })();
            }
        })();
    }, [token, router]);
    const authentication = async (e) => {
        e.preventDefault();
        if (device) {
            try {
                setLoading(true);
                const formdata = new FormData();
                formdata.append("email", email);
                formdata.append("device", device);
                formdata.append("width", width);
                const response = await axios.post("/api/auth", formdata);
                response.status === 200 ? setForm(false) : toast.error(response.statusText);
                setLoading(false);
            } catch (error) {
                toast.error(error.response.statusText);
                setLoading(false);
            }
        } else {
            toast.error(errors[400]);
        }
    }
    return (
        <div className={css.authentication}>
            {
                error && token ?
                    <div className={css.error}>
                        <Bug />
                        <p>Something went wrong!</p>
                        <button onClick={() => { router.push("/auth") }}>Retry</button>
                    </div> :
                    token ?
                        <div className={css.token}>
                            <div className={css.loading}></div>
                            <p>Validating token...</p>
                        </div> :
                        <form onSubmit={authentication}>
                            <h2>Nice Panda</h2>
                            <h3>Your Thoughts belong here.</h3>
                            {
                                form ?
                                    <>
                                        <div className={css.input}><input type="text" autoComplete='off' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} /><p>Email</p></div>
                                        {loading ? <div className={css.loader}><div className={css.loading}></div></div> : <input type="submit" value="Next" disabled={!email.includes("@gmail.com")} />}
                                    </> :
                                    <>
                                        <h4>A verification link has been sent to <b>{email}</b>. Please check your inbox and follow the link to complete your authentication. The email may take up to 5 minutes to arrive.</h4>
                                        <a href="https://gmail.com">Open Gmail</a>
                                    </>
                            }
                        </form>
            }
        </div>
    )
}

export default Content