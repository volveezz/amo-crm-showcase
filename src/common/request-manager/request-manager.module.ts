import { Module } from '@nestjs/common';
import { RequestManagerService } from './request-manager.service.js';

@Module({
  providers: [RequestManagerService],
  exports: [RequestManagerService],
})
export class RequestManagerModule {}
