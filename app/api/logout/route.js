import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookie = await cookies();
        cookie.delete("__tid_fpi");
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({}, { status: error.code });
    }
}