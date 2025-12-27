import authentication from "@/lib/authentication";
import _thought from "@/schema/thought";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.formData();
        const thought = data.get("thought");
        const fingerprint = data.get("fingerprint");
        const { id: bid } = await authentication(fingerprint);
        await _thought.create({ thought, bid });
        return NextResponse.json({ message: "Your thought is shared.", status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.", status: 400 });
    }
}