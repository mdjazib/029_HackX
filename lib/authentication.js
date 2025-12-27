import mongoose from "mongoose"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import login from "@/schema/login";
import account from "@/schema/account";

const authentication = async (fingerprint = false) => {
    try {
        // Connect to MongoDB if not already connected
        if (mongoose.connection.readyState === 0) {
            if (!process.env.MONGO_URI) {
                console.error("MONGO_URI not defined");
                return { status: 500, error: "Database configuration missing" };
            }
            await mongoose.connect(process.env.MONGO_URI);
        }

        const cookie = await cookies();
        const token = cookie.get("__tid_fpi")?.value;

        // If no token or fingerprint, return unauthorized
        if (!token || !fingerprint) {
            return { status: 401 };
        }

        // Verify token and get user
        try {
            if (!process.env.JWT_KEY) {
                console.error("JWT_KEY not defined");
                return { status: 500, error: "JWT configuration missing" };
            }

            const decoded = jwt.verify(token, process.env.JWT_KEY);
            if (!decoded?.lid) {
                return { status: 401 };
            }

            const loginDoc = await login.findOne({ _id: decoded.lid });
            if (!loginDoc?.aid) {
                return { status: 401 };
            }

            const accountDoc = await account.findOne({ _id: loginDoc.aid }).select("_id");
            if (!accountDoc?._id) {
                return { status: 401 };
            }

            return { id: accountDoc._id, status: 200 };
        } catch (error) {
            // JWT verification failed or invalid token
            console.error("Auth verification error:", error.message);
            return { status: 401 };
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return { status: 500, error: error.message };
    }
}

export default authentication;