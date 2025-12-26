import mongoose from "mongoose"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import login from "@/schema/login";
import account from "@/schema/account";
const authentication = async (fingerprint = false) => {
    if (mongoose.connection.readyState === 0) await mongoose.connect(process.env.MONGO_URI);
    const cookie = await cookies();
    const token = cookie.get("__tid_fpi")?.value;
    if (fingerprint && token) {
        try {
            const id = (await account.findOne({ _id: (await login.findOne({ _id: jwt.verify(token, process.env.JWT_KEY)?.lid })).aid }).select("_id"))._id;
            if (!id) return { status: 500 };
            return { id, status: 200 };
        } catch (error) {
            return { status: 500 };
        }
    }
}
export default authentication;