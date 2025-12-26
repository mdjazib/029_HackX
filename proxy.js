import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function proxy(request) {
    const cookieStore = await cookies();
    const { pathname } = request.nextUrl;
    const hasCookie = cookieStore.get("__tid_fpi")?.value;
    if (pathname.startsWith('/auth') && hasCookie) return NextResponse.redirect(new URL('/', request.url))
    if (!hasCookie && pathname !== '/auth') return NextResponse.redirect(new URL('/auth', request.url))
    return NextResponse.next()
}

export const config = { matcher: ['/', '/auth'] }
