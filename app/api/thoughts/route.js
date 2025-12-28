import mongoose from "mongoose";
import { NextResponse } from "next/server";
import thought from "@/schema/thought";
import account from "@/schema/account";
import { authentication } from "@/lib/authentication";

export async function POST(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { content, category = "other", isPublic = true } = await req.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const user = await account.findById(auth.id);
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
        const newThought = new thought({
            authorId: auth.id,
            authorUsername: user.username,
            content,
            lines,
            category,
            isPublic,
        });

        await newThought.save();
        return NextResponse.json(newThought, { status: 201 });
    } catch (error) {
        console.error("POST /api/thoughts error:", error);
        return NextResponse.json({ error: "Failed to create thought" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const category = searchParams.get("category");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = parseInt(searchParams.get("skip") || "0");

        let query = { isPublic: true };

        if (userId) {
            query.authorId = new mongoose.Types.ObjectId(userId);
        }

        if (category && category !== "all") {
            query.category = category;
        }

        const thoughts = await thought
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("authorId", "username avatar");

        const total = await thought.countDocuments(query);

        return NextResponse.json({
            data: thoughts,
            total,
            limit,
            skip,
        });
    } catch (error) {
        console.error("GET /api/thoughts error:", error);
        return NextResponse.json({ error: "Failed to fetch thoughts" }, { status: 500 });
    }
}
