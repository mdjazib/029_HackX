import mongoose, { Schema } from "mongoose";

const pawprintSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            required: true,
        },
        thoughtId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "thought",
            required: true,
        },
    },
    { timestamps: true }
);

// Ensure a user can only like a thought once
pawprintSchema.index({ userId: 1, thoughtId: 1 }, { unique: true });

export default mongoose.models.pawprint || mongoose.model("pawprint", pawprintSchema);
