"use client"
import React, { useState } from 'react'
import css from "../app/app.module.sass";
import { X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useStore } from '@/useStore';

const Create = ({ setCreateModel = () => { } }) => {
    const { fingerprint } = useStore();
    const [thought, setThought] = useState("");
    const [loading, setLoading] = useState(false);
    const post = async () => {
        try {
            setLoading(true);
            const formdata = new FormData();
            formdata.append("thought", thought);
            formdata.append("fingerprint", fingerprint);
            const { data } = await axios.post("/api/thought/create", formdata);
            data.status === 200 ? [toast.success(data.message), setCreateModel(false)] : [toast.error(data.message), setLoading(false)];
        } catch (error) {
            setLoading(false);
            toast.error(error.response.statusText);
        }
    }
    return (
        <div className={css.overlay}>
            <div className={css.create_post}>
                <div className={css.head}>
                    <h2>{loading ? "Sharing Thought" : "New Thought"}</h2>
                    {loading ? <></> : <X onClick={() => { setCreateModel(false) }} />}
                </div>
                {
                    loading ? <div className={css.sharing}><div className={css.loader}></div></div>
                        : <>
                            <textarea value={thought} onInput={(e) => { setThought(e.target.value) }} placeholder="Share something valuable today..."></textarea>
                            <div onClick={post} className={thought.trim() ? css.post : `${css.post} ${css.disabled}`}><div className={css.btn}>Post</div></div>
                        </>
                }
            </div>
        </div>
    )
}

export default Create