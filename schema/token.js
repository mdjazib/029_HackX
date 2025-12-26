import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        email: String,
        token: String,
        device: Object,
        expires: {
            type: Date,
            index: { expireAfterSeconds: 0 }
        }
    }
)

export default mongoose.models.token || mongoose.model("token", tokenSchema);