import { Injectable, NotFoundException } from '@nestjs/common';

export interface RequestPayload {
  accountId: number;
  body?: object;
  method?: string;
}

@Injectable()
export class RequestManagerService {
  private accessTokens = new Map<number, string>();

  addToken(accountId: number, token: string): void {
    this.accessTokens.set(accountId, token);
  }

  removeToken(accountId: number): void {
    this.accessTokens.delete(accountId);
  }

  async manageRequest(url: string, payload: RequestPayload): Promise<any> {
    const token = this.accessTokens.get(payload.accountId);
    if (!token) {
      throw new NotFoundException(
        `Access token not found for accountId ${payload.accountId}`,
      );
    }

    const method = payload.method || 'GET';

    const fetchOptions: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    if (payload.body) {
      fetchOptions.body = JSON.stringify(payload.body);
    }

    const endpointURL = `${process.env.AMO_CRM_API_URL}${url}`;

    const response = await fetch(endpointURL, fetchOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    return response.json();
  }
}
