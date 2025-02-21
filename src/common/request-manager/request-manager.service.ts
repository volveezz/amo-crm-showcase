import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface BaseRequestPayload {
  method?: string;
}

export interface RequestPayload extends BaseRequestPayload {
  accountId?: number;
  token?: string;
  body?: object;
}

export interface AuthRequestPayload extends BaseRequestPayload {
  code: string;
}

@Injectable()
export class RequestManagerService {
  constructor(private readonly configService: ConfigService) {}

  private accessTokens = new Map<number, string>();

  isAuthorized(accountId: number): boolean {
    return this.accessTokens.has(accountId);
  }

  addToken(accountId: number, token: string): void {
    this.accessTokens.set(accountId, token);
  }

  removeToken(accountId: number): void {
    this.accessTokens.delete(accountId);
  }

  private attachAuthorizationHeader(
    headers: Record<string, string>,
    accountIdOrToken?: number | string,
    requireAuth = false,
  ): void {
    if (!accountIdOrToken) return;

    let token: string | undefined;
    if (typeof accountIdOrToken === 'number') {
      token = this.accessTokens.get(accountIdOrToken);
    } else {
      token = accountIdOrToken;
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (requireAuth) {
      throw new NotFoundException(
        `Access token not found for accountId ${accountIdOrToken}`,
      );
    }
  }

  private async executeFetch(
    endpointURL: string,
    options: RequestInit,
  ): Promise<any> {
    const response = await fetch(endpointURL, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw response;
      // throw (`HTTP error ${response.status}: ${errorText}`);
    }

    if (response.status === 204) return {};

    return response.json();
  }

  async manageRequest(
    url: string,
    payload: RequestPayload,
    options?: { requireAuth?: boolean },
  ): Promise<any> {
    const method = payload.method ?? 'GET';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    this.attachAuthorizationHeader(
      headers,
      payload.token || payload.accountId,
      options?.requireAuth ?? false,
    );

    const fetchOptions: RequestInit = { method, headers };

    if (payload.body) {
      fetchOptions.body = JSON.stringify(payload.body);
    }

    const endpointURL = `${this.configService.get('AMO_CRM_API_URL')}${url}`;

    return this.executeFetch(endpointURL, fetchOptions);
  }

  async manageAuthRequest(code: string): Promise<any> {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.configService.get('AMO_CRM_INTEGRATION_KEY'),
        client_secret: this.configService.get('AMOCRM_SECRET_KEY'),
        code,
        redirect_uri: this.configService.get('AMO_CRM_REDIRECT_URL'),
        grant_type: 'authorization_code',
      }),
    };

    const endpointURL = this.configService.get('AMO_CRM_OAUTH_TOKEN_URL');
    return this.executeFetch(endpointURL, fetchOptions);
  }
}
