import { getUsers } from '@/domain/services/users.service';

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
    } catch (error: any)  {
        return new Response(error.message, { status: 404})
    }
}
