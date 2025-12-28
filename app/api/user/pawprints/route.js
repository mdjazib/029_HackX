import mongoose from "mongoose";
import { NextResponse } from "next/server";
import pawprint from "@/schema/pawprint";
import thought from "@/schema/thought";
import { authentication } from "@/lib/authentication";

export async function GET(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const pawprints = await pawprint
            .find({ userId: auth.id })
            .populate({
                path: "thoughtId",
                select: "content category authorUsername pawprints createdAt",
                populate: {
                    path: "authorId",
                    select: "username avatar mindset",
                },
            })
            .sort({ createdAt: -1 });

        return NextResponse.json({
            pawprints,
            count: pawprints.length,
        });
    } catch (error) {
        console.error("GET /api/user/pawprints error:", error);
        return NextResponse.json({ error: "Failed to fetch pawprints" }, { status: 500 });
    }
}
