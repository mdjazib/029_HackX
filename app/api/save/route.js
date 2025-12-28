import mongoose from "mongoose";
import { NextResponse } from "next/server";
import save from "@/schema/save";
import thought from "@/schema/thought";
import { authentication } from "@/lib/authentication";

export async function POST(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { thoughtId } = await req.json();
        if (!thoughtId) {
            return NextResponse.json({ error: "thoughtId is required" }, { status: 400 });
        }

        const thoughtDoc = await thought.findById(thoughtId);
        if (!thoughtDoc) return NextResponse.json({ error: "Thought not found" }, { status: 404 });

        try {
            const newSave = new save({ userId: auth.id, thoughtId });
            await newSave.save();

            thoughtDoc.saves += 1;
            thoughtDoc.savedBy.push(auth.id);
            await thoughtDoc.save();

            return NextResponse.json(newSave, { status: 201 });
        } catch (error) {
            if (error.code === 11000) {
                return NextResponse.json({ error: "Already saved" }, { status: 409 });
            }
            throw error;
        }
    } catch (error) {
        console.error("POST /api/save error:", error);
        return NextResponse.json({ error: "Failed to save thought" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { searchParams } = new URL(req.url);
        const thoughtId = searchParams.get("thoughtId");
        if (!thoughtId) {
            return NextResponse.json({ error: "thoughtId is required" }, { status: 400 });
        }

        const saveDoc = await save.findOneAndDelete({ userId: auth.id, thoughtId });
        if (!saveDoc) {
            return NextResponse.json({ error: "Save not found" }, { status: 404 });
        }

        const thoughtDoc = await thought.findById(thoughtId);
        if (thoughtDoc) {
            thoughtDoc.saves = Math.max(0, thoughtDoc.saves - 1);
            thoughtDoc.savedBy = thoughtDoc.savedBy.filter((id) => id.toString() !== auth.id.toString());
            await thoughtDoc.save();
        }

        return NextResponse.json({ message: "Unsave successful" });
    } catch (error) {
        console.error("DELETE /api/save error:", error);
        return NextResponse.json({ error: "Failed to unsave thought" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const saves = await save
            .find({ userId: auth.id })
            .populate({
                path: "thoughtId",
                select: "content category authorUsername pawprints saves createdAt",
                populate: {
                    path: "authorId",
                    select: "username avatar mindset",
                },
            })
            .sort({ createdAt: -1 });

        return NextResponse.json({ saves, count: saves.length });
    } catch (error) {
        console.error("GET /api/save error:", error);
        return NextResponse.json({ error: "Failed to fetch saves" }, { status: 500 });
    }
}
