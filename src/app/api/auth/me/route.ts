import { NextRequest, NextResponse } from 'next/server';
import { extractSession } from '@/lib/auth/session.utils';

export async function GET(request: NextRequest) {
    const payload = await extractSession(request);
    const username = payload.username;
    console.log('username', username);

    return NextResponse.json({ username: username });
}
