import authentication from "@/lib/authentication";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const fingerprint = req.headers.get("fingerprint");
        const response = await authentication(fingerprint);
        
        if (!response) {
            return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
        }
        
        return NextResponse.json(
            { authenticated: response.status === 200 }, 
            { status: response.status }
        );
    } catch (error) {
        console.error("Verify endpoint error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}