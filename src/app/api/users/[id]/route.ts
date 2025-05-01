import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/domain/services/users.service';

export const dynamic = 'force-static'

// GET /api/users/:id
export async function GET(
      request: NextRequest,
{ params }: { params: Promise<{ id: number}> }
) {
      try {
            const { id } = await params

            const user = await getUserById(id);
            return new NextResponse(
                  JSON.stringify(user),
                  { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
      } catch (error: unknown){
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return new NextResponse(message, {
              status: 401,
              headers: {
                    "Content-Type": "text/plain",
                    "Set-Cookie": `token=;`,
              }
        })
}
}
