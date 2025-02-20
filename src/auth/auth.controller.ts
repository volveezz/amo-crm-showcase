import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestManagerService } from '../common/request-manager/request-manager.service.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly requestManager: RequestManagerService) {}

  @Get('callback')
  async authCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('referer') referer: string,
    @Query('error') error: string,
    @Res() res: Response,
  ) {
    if (error) {
      throw new HttpException(
        `Authorization error: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!code) {
      throw new HttpException(
        'Missing authorization code',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokenResponse = await this.requestManager.manageAuthRequest(code);

    if (!tokenResponse.ok) {
      throw new HttpException(
        `Token exchange failed: ${tokenResponse}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;
    if (!access_token) {
      throw new HttpException('Token data incomplete', HttpStatus.BAD_GATEWAY);
    }

    const { id } = await this.requestManager.manageRequest('/account', {
      token: access_token,
    });

    this.requestManager.addToken(id, access_token);

    return res.redirect(`/?auth=success&state=${state}`);
  }
}
