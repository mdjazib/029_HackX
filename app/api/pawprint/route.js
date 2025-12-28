import mongoose from "mongoose";
import { NextResponse } from "next/server";
import pawprint from "@/schema/pawprint";
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

        // Check if thought exists
        const thoughtDoc = await thought.findById(thoughtId);
        if (!thoughtDoc) return NextResponse.json({ error: "Thought not found" }, { status: 404 });

        // Try to create pawprint (unique constraint will prevent duplicates)
        try {
            const newPawprint = new pawprint({
                userId: auth.id,
                thoughtId,
            });

            await newPawprint.save();

            // Increment pawprint count on thought
            thoughtDoc.pawprints += 1;
            thoughtDoc.likedBy.push(auth.id);
            await thoughtDoc.save();

            return NextResponse.json(newPawprint, { status: 201 });
        } catch (error) {
            if (error.code === 11000) {
                // User already liked this thought
                return NextResponse.json({ error: "Already liked" }, { status: 409 });
            }
            throw error;
        }
    } catch (error) {
        console.error("POST /api/pawprint error:", error);
        return NextResponse.json({ error: "Failed to like thought" }, { status: 500 });
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

        const pawprintDoc = await pawprint.findOneAndDelete({
            userId: auth.id,
            thoughtId,
        });

        if (!pawprintDoc) {
            return NextResponse.json({ error: "Pawprint not found" }, { status: 404 });
        }

        // Decrement pawprint count on thought
        const thoughtDoc = await thought.findById(thoughtId);
        if (thoughtDoc) {
            thoughtDoc.pawprints = Math.max(0, thoughtDoc.pawprints - 1);
            thoughtDoc.likedBy = thoughtDoc.likedBy.filter(
                (id) => id.toString() !== auth.id.toString()
            );
            await thoughtDoc.save();
        }

        return NextResponse.json({ message: "Pawprint removed" });
    } catch (error) {
        console.error("DELETE /api/pawprint error:", error);
        return NextResponse.json({ error: "Failed to unlike thought" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { searchParams } = new URL(req.url);
        const thoughtId = searchParams.get("thoughtId");

        if (!thoughtId) {
            return NextResponse.json({ error: "thoughtId is required" }, { status: 400 });
        }

        const pawprints = await pawprint
            .find({ thoughtId })
            .populate("userId", "username avatar");

        return NextResponse.json({
            pawprints,
            count: pawprints.length,
        });
    } catch (error) {
        console.error("GET /api/pawprint error:", error);
        return NextResponse.json({ error: "Failed to fetch pawprints" }, { status: 500 });
    }
}
