import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestManagerService } from '../common/request-manager/request-manager.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly requestManager: RequestManagerService) {}

  authRedirect(authUrl: string) {
    return { authUrl };
  }

  async authCallback(
    code: string,
    // state: string,
    // referer: string,
    error: string,
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

    const { access_token } = await this.requestManager.manageAuthRequest(code);

    if (!access_token) {
      throw new HttpException(`Token exchange failed`, HttpStatus.BAD_GATEWAY);
    }

    const { id } = await this.requestManager.manageRequest('account', {
      token: access_token,
    });

    this.requestManager.addToken(id, access_token);

    return id;
  }
}
