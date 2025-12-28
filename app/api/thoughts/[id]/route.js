import mongoose from "mongoose";
import { NextResponse } from "next/server";
import thought from "@/schema/thought";
import { authentication } from "@/lib/authentication";

export async function PUT(req, { params }) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const thoughtDoc = await thought.findById(params.id);
        if (!thoughtDoc) return NextResponse.json({ error: "Thought not found" }, { status: 404 });

        // Only author can edit
        if (thoughtDoc.authorId.toString() !== auth.id.toString()) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { content, category, isPublic } = await req.json();

        if (content) thoughtDoc.content = content;
        if (category) thoughtDoc.category = category;
        if (isPublic !== undefined) thoughtDoc.isPublic = isPublic;

        await thoughtDoc.save();
        return NextResponse.json(thoughtDoc);
    } catch (error) {
        console.error("PUT /api/thoughts error:", error);
        return NextResponse.json({ error: "Failed to update thought" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const thoughtDoc = await thought.findById(params.id);
        if (!thoughtDoc) return NextResponse.json({ error: "Thought not found" }, { status: 404 });

        // Only author can delete
        if (thoughtDoc.authorId.toString() !== auth.id.toString()) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await thought.findByIdAndDelete(params.id);
        return NextResponse.json({ message: "Thought deleted" });
    } catch (error) {
        console.error("DELETE /api/thoughts error:", error);
        return NextResponse.json({ error: "Failed to delete thought" }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const thoughtDoc = await thought
            .findById(params.id)
            .populate("authorId", "username avatar mindset");

        if (!thoughtDoc) return NextResponse.json({ error: "Thought not found" }, { status: 404 });

        return NextResponse.json(thoughtDoc);
    } catch (error) {
        console.error("GET /api/thoughts/[id] error:", error);
        return NextResponse.json({ error: "Failed to fetch thought" }, { status: 500 });
    }
}
