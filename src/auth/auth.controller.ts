import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: { email: string; password: string }) {
    const user = await this.authService.signUp(body.email, body.password);
    return { user };
  }

  @Post('sign-in')
  async signIn(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(body.email, body.password);
    await this.authService.createSession(req, res, user.recipeUserId);
    return { user };
  }

  @Post('verify-session')
  async verifySession(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = await this.authService.verifySession(req, res);
    console.log('controller', userId);
    return { userId };
  }

  @Post('logout')
  async logout(@Body() body: { sessionHandle: string }) {
    await this.authService.logout(body.sessionHandle);
    return { success: true };
  }
}
