import { getUsers } from '@/domain/services/users.service';
import { NextResponse } from "next/server";

export const dynamic = 'force-static'

// GET /api/users
export async function GET() {
    try{
        const users = await getUsers();

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
