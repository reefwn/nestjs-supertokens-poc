import { Injectable } from '@nestjs/common';
import { RecipeUserId } from 'supertokens-node';
import { signUp, signIn } from 'supertokens-node/recipe/emailpassword';
import {
  createNewSession,
  getSession,
  revokeSession,
} from 'supertokens-node/recipe/session';

@Injectable()
export class AuthService {
  async signUp(email: string, password: string) {
    const response = await signUp('public', email, password);
    if (response.status === 'OK') {
      return response;
    } else {
      throw new Error(response.status);
    }
  }

  async signIn(email: string, password: string) {
    const response = await signIn('public', email, password);
    if (response.status === 'OK') {
      return response;
    } else {
      throw new Error(response.status);
    }
  }

  async createSession(req: any, res: any, user: RecipeUserId) {
    await createNewSession(req, res, 'public', user);
  }

  async verifySession(req: any, res: any) {
    const session = await getSession(req, res);
    return session.getUserId();
  }

  async logout(sessionHandle: string) {
    await revokeSession(sessionHandle);
  }
}
