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

            console.log('GET id', id);

            const user = await getUserById(id);
            return new NextResponse(
                  JSON.stringify(user),
                  { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
      } catch (error: any) {
            return new NextResponse(error.message, { status: 404})
      }
}
