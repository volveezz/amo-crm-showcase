import { Injectable, NotFoundException } from '@nestjs/common';

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
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }
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

    const endpointURL = `${process.env.AMO_CRM_API_URL}${url}`;
    return this.executeFetch(endpointURL, fetchOptions);
  }

  async manageAuthRequest(code: string): Promise<any> {
    const fetchOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        client_id: process.env.AMO_CRM_INTEGRATION_KEY,
        client_secret: process.env.AMOCRM_SECRET_KEY,
        code,
        redirect_uri: process.env.AMO_CRM_REDIRECT_URL,
      }),
    };

    const endpointURL = 'https://www.amocrm.ru/oauth2/access_token';
    return this.executeFetch(endpointURL, fetchOptions);
  }
}
