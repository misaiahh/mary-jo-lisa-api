import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Logger,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<{ access_token: string }> {
    const {
      user: { userId, username },
    } = req;
    this.logger.log('[login]', userId, username);

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): any {
    const {
      user: { userId, username },
    } = req;
    this.logger.log('[getProfile]', userId, username);

    return req.user;
  }
}
