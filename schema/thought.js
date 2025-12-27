import mongoose, { Schema } from "mongoose";

const thoughtSchema = new Schema(
    {
        bid: String,
        thought: String,
        public: { type: Boolean, default: true },
        archive: { type: Boolean, default: false },
        deleteAt: { type: Date, default: null, expires: 0 }
    }, { timestamps: true }
)

export default mongoose.models.thought || mongoose.model("thought", thoughtSchema);