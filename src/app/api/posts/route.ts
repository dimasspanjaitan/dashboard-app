import { getPostswithUser } from '@/domain/services/posts.service';

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
      } catch (error: any)  {
            return new Response(error.message, { status: 404})
      }
}
