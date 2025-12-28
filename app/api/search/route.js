import mongoose from "mongoose";
import { NextResponse } from "next/server";
import thought from "@/schema/thought";
import account from "@/schema/account";

export async function GET(req) {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // "author" | "keyword"
        const queryString = searchParams.get("query");
        const category = searchParams.get("category");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = parseInt(searchParams.get("skip") || "0");

        if (!type || !queryString) {
            return NextResponse.json(
                { error: "type and query parameters are required" },
                { status: 400 }
            );
        }

        let searchQuery = { isPublic: true };

        if (type === "author") {
            // Search by username
            const users = await account.find({
                username: { $regex: queryString, $options: "i" },
            }).select("_id");

            const userIds = users.map((u) => u._id);
            searchQuery.authorId = { $in: userIds };
        } else if (type === "keyword") {
            // Search by content keywords
            searchQuery.$text = { $search: queryString };
        } else {
            return NextResponse.json({ error: "Invalid search type" }, { status: 400 });
        }

        if (category && category !== "all") {
            searchQuery.category = category;
        }

        const results = await thought
            .find(searchQuery)
            .sort(type === "keyword" ? { score: { $meta: "textScore" } } : { createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("authorId", "username avatar mindset");

        const total = await thought.countDocuments(searchQuery);

        return NextResponse.json({
            results,
            total,
            limit,
            skip,
            searchType: type,
            query: queryString,
        });
    } catch (error) {
        console.error("GET /api/search error:", error);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
