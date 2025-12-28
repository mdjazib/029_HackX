import mongoose from "mongoose";
import { NextResponse } from "next/server";
import reply from "@/schema/reply";
import thought from "@/schema/thought";
import { authentication } from "@/lib/authentication";

export async function POST(req) {
  try {
    const auth = await authentication(true);
    if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const { thoughtId, content } = await req.json();
    if (!thoughtId || !content || !content.trim()) {
      return NextResponse.json({ error: "thoughtId and non-empty content required" }, { status: 400 });
    }

    const t = await thought.findById(thoughtId);
    if (!t) return NextResponse.json({ error: "Thought not found" }, { status: 404 });

    const r = new reply({ userId: auth.id, thoughtId, content: content.trim() });
    await r.save();

    t.replies = (t.replies || 0) + 1;
    await t.save();

    return NextResponse.json(r, { status: 201 });
  } catch (error) {
    console.error("POST /api/replies error:", error);
    return NextResponse.json({ error: "Failed to post reply" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const { searchParams } = new URL(req.url);
    const thoughtId = searchParams.get("thoughtId");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = parseInt(searchParams.get("skip") || "0");

    if (!thoughtId) {
      return NextResponse.json({ error: "thoughtId is required" }, { status: 400 });
    }

    const replies = await reply
      .find({ thoughtId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username avatar");

    const total = await reply.countDocuments({ thoughtId });

    return NextResponse.json({ replies, total, limit, skip });
  } catch (error) {
    console.error("GET /api/replies error:", error);
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}
