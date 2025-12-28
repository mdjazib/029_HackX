import mongoose, { Schema } from "mongoose";

const saveSchema = new Schema(
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

// Ensure a user can only save a thought once
saveSchema.index({ userId: 1, thoughtId: 1 }, { unique: true });

export default mongoose.models.save || mongoose.model("save", saveSchema);
