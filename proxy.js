import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function proxy(request) {
    const cookieStore = await cookies();
    const { pathname } = request.nextUrl;
    const hasCookie = cookieStore.get("__tid_fpi")?.value;
    
    // If authenticated and trying to access auth page, redirect to home
    if (pathname.startsWith('/auth') && hasCookie) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Allow everyone to view the forest (main page)
    // Only require auth for protected actions (profile, posting)
    const protectedPaths = ['/profile'];
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    
    if (!hasCookie && isProtectedPath) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
    
    return NextResponse.next()
}

export const config = { matcher: ['/', '/auth', '/profile'] }
