import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { isAuthenticated } from './lib/auth/session.utils';

const protectedRoutes = ['/users', '/posts', '/', '/signin', '/api/auth/me']; // Add all protected routes here

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const requiresAuth = protectedRoutes.some((route) => pathname.startsWith(route));

    if (!requiresAuth) {
        return NextResponse.next();
    }

    const authenticated = await isAuthenticated(request);

    if (authenticated && pathname.startsWith('/signin')) {
        const dashboardUrl = new URL('/', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    if (!authenticated && !pathname.startsWith('/signin')) {
        const loginUrl = new URL('/signin', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/users/:path*', '/posts/:path*', '/', '/signin', '/api/auth/me'],
};
