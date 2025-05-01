import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse("Logged out", {
    status: 200,
    headers: {
      "Set-Cookie": `token=; Max-Age=0; Path=/; SameSite=Strict; HttpOnly`,
    },
  });
}