import mongoose, { Schema } from "mongoose";

const loginSchema = new Schema(
    {
        aid: String,
        device: Object,
        expires: {
            type: Date,
            index: { expireAfterSeconds: 0 }
        }
    }, { timestamps: true }
)

export default mongoose.models.login || mongoose.model("login", loginSchema);