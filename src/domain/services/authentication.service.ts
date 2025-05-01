import { findUser, validateUserPassword } from "@/domain/models/userSignin.model";
import type { UserSignin } from '@/domain/models/userSignin.model'

import { generateToken } from "@/lib/auth/jwt.utils";

// signin generates token for validated user so user can access protected routes
export async function signin(username: string, password: string): Promise<string> {
      const user = validateUser(username, password);

      const token = generateToken(user.username)

      return token
}

// validateUser prevents invalid user from accessing protected routes
function validateUser(username: string, password: string): UserSignin {
      const user = findUser(username);
      if (!user) {
            throw new Error('Invalid username or password');
      }

      if (!validateUserPassword(password, user)) {
            throw new Error('Invalid username or password');
      }

      return user;
}