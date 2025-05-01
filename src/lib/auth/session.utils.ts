import { NextRequest } from 'next/server';
import { verifyToken } from './jwt.utils';
import type { UserJwtPayload } from './jwt.utils';

// isAuthenticated determines whether the request should be handled
// or ignored by the middleware
export async function isAuthenticated(request: NextRequest) {
      try {
            const payload = await extractSession(request);
            if (payload == null) {
                  return false;
            }

            request.headers.set('x-user-id', payload.username);

            return true

      } catch {
            return false;
      }
}

export async function extractSession(request: NextRequest): Promise<UserJwtPayload> {
      const token = request.cookies.get('token')?.value;
      if (token == null) {
            throw new Error('invalid session');
      }

      const payload = await verifyToken(token);
      return payload;
}