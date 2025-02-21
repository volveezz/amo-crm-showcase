import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  async redirectToAuth() {
    const state = Math.random().toString(36).substring(7);
    const authUrl = `${this.configService.get('AUTH_URL')}&state=${state}`;

    return this.authService.authRedirect(authUrl);
  }

  // @ApiQuery({ name: 'state', required: true })
  // @ApiQuery({ name: 'referer', required: true })
  @ApiQuery({ name: 'code', required: true })
  @ApiQuery({ name: 'error', required: false })
  @Get('callback')
  async authCallback(
    @Query('code') code: string,
    // @Query('state') state: string,
    // @Query('referer') referer: string,
    @Query('error') error: string,
  ) {
    const accountId = await this.authService.authCallback(
      code,
      // state,
      // referer,
      error,
    );

    return { accountId };
  }
}
