import { Injectable } from '@nestjs/common';
import { RequestManagerService } from '../common/request-manager/request-manager.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';

@Injectable()
export class AmocrmService {
  constructor(private readonly requestManagerService: RequestManagerService) {}

  checkAuth(accountId: number) {
    return { authorized: this.requestManagerService.isAuthorized(accountId) };
  }

  async getAccountDetails(accountId: number): Promise<any> {
    return await this.requestManagerService.manageRequest(`account`, {
      accountId,
    });
  }

  async addLeads(accountId: number, leads: CreateLeadDto[]) {
    return await this.requestManagerService.manageRequest(`leads/complex`, {
      method: 'POST',
      accountId,
      body: leads,
    });
  }

  async getLeadById(accountId: number, leadId: number, withParams: string[]) {
    return await this.requestManagerService.manageRequest(
      `leads/${leadId}${withParams.length > 0 ? `?with=${withParams.join(',')}` : ''}`,
      {
        accountId,
      },
    );
  }

  async getLeads(accountId: number, withParams: string[]) {
    return await this.requestManagerService.manageRequest(
      `leads${withParams.length > 0 ? `?with=${withParams.join(',')}` : ''}`,
      {
        accountId,
      },
    );
  }

  async deleteLead(accountId: number, leadId: number) {
    return await this.requestManagerService.manageRequest(
      `accounts/${accountId}/leads/${leadId}`,
      {
        accountId,
        method: 'DELETE',
      },
    );
  }

  async getContacts(accountId: number, withParams: string[]) {
    return await this.requestManagerService.manageRequest(
      `contacts${withParams.length > 0 ? `?with=${withParams.join(',')}` : ''}`,
      {
        accountId,
      },
    );
  }

  async addContacts(accountId: number, contacts: CreateContactDto[]) {
    return await this.requestManagerService.manageRequest('contacts', {
      accountId,
      method: 'POST',
      body: contacts,
    });
  }

  async getPipelines(accountId: number) {
    return await this.requestManagerService.manageRequest('leads/pipelines', {
      accountId,
    });
  }

  async getPipelineById(accountId: number, pipelineId: number) {
    return await this.requestManagerService.manageRequest(
      `leads/pipelines/${pipelineId}`,
      {
        accountId,
      },
    );
  }

  async getPipelineStatuses(accountId: number, pipelineId: number) {
    return await this.requestManagerService.manageRequest(
      `leads/pipelines/${pipelineId}/statuses`,
      {
        accountId,
      },
    );
  }
}
