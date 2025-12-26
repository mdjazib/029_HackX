import authentication from "@/lib/authentication";
import { NextResponse } from "next/server";

export async function GET(req) {
    const fingerprint = req.headers.get("fingerprint");
    const response = await authentication(fingerprint);
    return NextResponse.json({}, { status: response.status });
}