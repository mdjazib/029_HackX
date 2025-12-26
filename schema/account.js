import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
    {
        name: String,
        username: String,
        email: String,
        password: String,
        avatar: String,
        banner: String,
        audio: String,
        about: String,
        gender: String,
        dob: String,
        interests: Array,
        socials: Array,
        private: { type: Boolean, default: false },
        mindset: String,
        pid: String,
    }, { timestamps: true }
)

export default mongoose.models.account || mongoose.model("account", accountSchema);