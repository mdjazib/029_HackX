import mongoose, { Schema } from "mongoose";

const thoughtSchema = new Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            required: true,
        },
        authorUsername: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 2000,
        },
        // Store each line of content for line-level features
        lines: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            enum: ["motivational", "poetry", "reflection", "creative-writing", "quote", "emotion", "other"],
            default: "other",
        },
        pawprints: {
            type: Number,
            default: 0,
        },
        shares: {
            type: Number,
            default: 0,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        likedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "account",
            },
        ],
        saves: {
            type: Number,
            default: 0,
        },
        savedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "account",
            },
        ],
        replies: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Index for faster searches
thoughtSchema.index({ authorId: 1, createdAt: -1 });
thoughtSchema.index({ content: "text" });
thoughtSchema.index({ category: 1 });
thoughtSchema.index({ isPublic: 1 });

export default mongoose.models.thought || mongoose.model("thought", thoughtSchema);
