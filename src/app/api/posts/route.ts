import { getPostswithUser } from '@/domain/services/posts.service';
import { NextResponse } from "next/server";

export const dynamic = 'force-static'

// GET /api/posts
export async function GET() {
      try{
            const posts = await getPostswithUser();

            return new Response(JSON.stringify(posts), {
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
