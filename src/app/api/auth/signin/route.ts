import { NextRequest, NextResponse } from "next/server";
import { signin } from "@/domain/services/authentication.service";

// POST /api/auth/signin
// Body: {username: string, password: string}
//
// POST handles user authentication and mnanage user's session token
export async function POST(request: NextRequest) {
      try {
            const credentials = await request.json();

            if (credentials.username == null) {
                  throw new Error('Missing username');
            }

            if (credentials.password == null) { 
                  throw new Error('Missing password');
            }

            const token = await signin(credentials.username, credentials.password)

            return new NextResponse("authenticated!", {
                  status: 200,
                  headers: {
                        "Content-Type": "text/plain",
                        "Set-Cookie": `token=${token}; Path=/; SameSite=Lax; HttpOnly;`,
                  },
            })
      } catch(err: any){
            return new NextResponse(err.message, {
                  status: 401,
                  headers: {
                        "Content-Type": "text/plain",
                        "Set-Cookie": `token=;`,
                  }
            })
      }

}
