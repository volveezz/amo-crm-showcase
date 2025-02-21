import { Module } from '@nestjs/common';
import { RequestManagerModule } from '../common/request-manager/request-manager.module.js';
import { AmocrmController } from './amocrm.controller.js';
import { AmocrmService } from './amocrm.service.js';

@Module({
  imports: [RequestManagerModule],
  controllers: [AmocrmController],
  providers: [AmocrmService],
  exports: [AmocrmService],
})
export class AmocrmModule {}
