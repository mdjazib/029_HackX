"use client";
import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { toast } from "sonner";
import css from "@/app/app.module.sass";

const categories = [
    { value: "motivational", label: "💪 Motivational" },
    { value: "poetry", label: "📖 Poetry" },
    { value: "reflection", label: "🪞 Reflection" },
    { value: "creative-writing", label: "✍️ Creative Writing" },
    { value: "quote", label: "💬 Quote" },
    { value: "emotion", label: "💛 Emotion" },
    { value: "other", label: "🌿 Other" },
];

const CreateThoughtModal = ({ isOpen, onClose, onSuccess }) => {
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("other");
    const [isPublic, setIsPublic] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            toast.error("Your thought needs some content");
            return;
        }

        if (content.length > 2000) {
            toast.error("Thoughts are max 2000 characters");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/thoughts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: content.trim(),
                    category,
                    isPublic,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                toast.error(error.error || "Failed to share thought");
                return;
            }

            toast.success("Thought shared! 🐾");
            setContent("");
            setCategory("other");
            setIsPublic(true);
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error("Error creating thought:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={css.modal_overlay} onClick={onClose}>
            <div className={css.modal_content} onClick={(e) => e.stopPropagation()}>
                <div className={css.modal_header}>
                    <h2>Share a thought</h2>
                    <button onClick={onClose} className={css.modal_close}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={css.modal_form}>
                    <div className={css.form_group}>
                        <textarea
                            placeholder="What's on your mind? Share your honest thoughts..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={2000}
                            rows={6}
                            className={css.form_textarea}
                        />
                        <div className={css.char_count}>
                            {content.length}/2000
                        </div>
                    </div>

                    <div className={css.form_group}>
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={css.form_select}
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={css.form_group}>
                        <label className={css.checkbox_label}>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                            <span>Make this thought public</span>
                        </label>
                        <small>Private thoughts are only visible to you</small>
                    </div>

                    <div className={css.modal_actions}>
                        <button type="button" onClick={onClose} className={css.btn_secondary}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !content.trim()}
                            className={css.btn_primary}
                        >
                            {isLoading ? "Sharing..." : <>
                                <Send size={16} />
                                Share Thought
                            </>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateThoughtModal;
