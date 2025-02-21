import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AmocrmService } from './amocrm.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';

@ApiTags('Amocrm')
@Controller('amocrm')
export class AmocrmController {
  constructor(private readonly amocrmService: AmocrmService) {}

  @Get('isAuthorized')
  @ApiQuery({ name: 'accountId', required: true })
  async isAuthorized(@Query('accountId', ParseIntPipe) accountId: number) {
    return this.amocrmService.checkAuth(accountId);
  }

  @Get('account')
  @ApiQuery({ name: 'accountId', required: true })
  async getAccountDetails(@Query('accountId', ParseIntPipe) accountId: number) {
    return this.amocrmService.getAccountDetails(accountId);
  }

  @Get('leads')
  @ApiQuery({
    name: 'accountId',
    required: true,
    description: 'The account ID to fetch leads for',
  })
  @ApiQuery({
    name: 'with',
    required: false,
    description: 'Specify additional data to include in the lead response',
    type: [String],
    enum: [
      'contacts',
      'only_deleted',
      'loss_reason',
      'is_price_modified_by_robot',
      'catalog_elements',
      'source_id',
    ],
    isArray: true,
  })
  async getLeads(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Query('with') withParams: string[] = [],
  ) {
    return this.amocrmService.getLeads(
      accountId,
      typeof withParams === 'string' ? [withParams] : withParams,
    );
  }

  @Get('leads/:leadId')
  @ApiQuery({ name: 'accountId', required: true })
  @ApiParam({ name: 'leadId', required: true })
  @ApiQuery({
    name: 'with',
    required: false,
    description: 'Specify additional data to include in the lead response',
    type: [String],
    enum: [
      'catalog_elements',
      'is_price_modified_by_robot',
      'loss_reason',
      'contacts',
      'only_deleted',
      'source_id',
    ],
    isArray: true,
  })
  async getLeadById(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Param('leadId', ParseIntPipe) leadId: number,
    @Query('with') withParams: string[] = [],
  ) {
    return this.amocrmService.getLeadById(
      accountId,
      leadId,
      typeof withParams === 'string' ? [withParams] : withParams,
    );
  }

  @Post('leads')
  @ApiOperation({
    summary: 'Add leads',
    description: 'Add multiple or singular leads to the account.',
  })
  @ApiQuery({
    name: 'accountId',
    required: true,
  })
  @ApiBody({
    description: 'Lead data to be added',
    type: [CreateLeadDto],
  })
  @ApiResponse({
    status: 200,
    description: 'Leads successfully added',
    type: CreateLeadDto,
  })
  @ApiResponse({
    status: 204,
    description: 'No content',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createLead(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Body() createLeadDto: CreateLeadDto[],
  ) {
    return this.amocrmService.addLeads(accountId, createLeadDto);
  }

  @Get('contacts')
  @ApiQuery({
    name: 'with',
    required: false,
    description: 'Specify additional data to include in the lead response',
    type: [String],
    enum: ['leads', 'catalog_elements'],
    isArray: true,
  })
  @ApiQuery({ name: 'accountId', required: true })
  async getContacts(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Query('with') withParams: string[] = [],
  ) {
    return this.amocrmService.getContacts(accountId, withParams);
  }

  @Post('contacts')
  @ApiOperation({
    summary: 'Add contacts',
    description:
      'Allows adding multiple or singular contacts into the account.',
  })
  @ApiQuery({
    name: 'accountId',
    required: true,
  })
  @ApiBody({
    description: 'Array of contacts to be added',
    type: [CreateContactDto],
  })
  @ApiResponse({
    status: 200,
    description: 'Contacts successfully added',
    type: CreateContactDto,
  })
  @ApiResponse({
    status: 204,
    description: 'No content',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createContacts(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Body() createContactDto: CreateContactDto[],
  ) {
    return this.amocrmService.addContacts(accountId, createContactDto);
  }

  @Get('pipelines')
  @ApiQuery({ name: 'accountId', required: true })
  async getPipelines(@Query('accountId', ParseIntPipe) accountId: number) {
    return this.amocrmService.getPipelines(accountId);
  }

  @Get('pipelines/:pipelineId')
  @ApiQuery({ name: 'accountId', required: true })
  @ApiParam({ name: 'pipelineId', required: true })
  async getPipelineById(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Param('pipelineId', ParseIntPipe) pipelineId: number,
  ) {
    return this.amocrmService.getPipelineById(accountId, pipelineId);
  }

  @Get('pipelines/:pipelineId/statuses')
  @ApiQuery({ name: 'accountId', required: true })
  @ApiParam({ name: 'pipelineId', required: true })
  async getPipelineStatuses(
    @Query('accountId', ParseIntPipe) accountId: number,
    @Param('pipelineId', ParseIntPipe) pipelineId: number,
  ) {
    return this.amocrmService.getPipelineStatuses(accountId, pipelineId);
  }
}
