import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

const SECRET_KEY = process.env.TOKEN_SECRET || 'default-secret-key';
const EXPIRES_IN = process.env.TOKEN_EXPIRATION || '1h';

export type UserJwtPayload =  {
  username: string
  jti: string
  iat: number
}

export async function generateToken (username: string): Promise<string> {
      const payload = {
            username: username,
      }

      return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime(EXPIRES_IN)
            .sign(new TextEncoder().encode(SECRET_KEY))
};

export async function verifyToken(token: string): Promise<UserJwtPayload> {
      try {
            const verified = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

            return verified.payload as UserJwtPayload
      } catch (error) {
            throw new Error("Token has expired or is invalid");
      }
}
