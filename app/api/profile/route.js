import mongoose from "mongoose";
import { NextResponse } from "next/server";
import account from "@/schema/account";
import { authentication } from "@/lib/authentication";

export async function GET(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const user = await account.findById(auth.id).select("-password");
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json(user);
    } catch (error) {
        console.error("GET /api/profile error:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const auth = await authentication(true);
        if (auth.status !== 200) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { name, mindset, about, avatar, banner } = await req.json();

        const user = await account.findByIdAndUpdate(
            auth.id,
            {
                ...(name && { name }),
                ...(mindset && { mindset }),
                ...(about && { about }),
                ...(avatar && { avatar }),
                ...(banner && { banner }),
            },
            { new: true }
        ).select("-password");

        return NextResponse.json(user);
    } catch (error) {
        console.error("PUT /api/profile error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
