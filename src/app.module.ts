import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmocrmModule } from './amocrm/amocrm.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RequestManagerModule } from './common/request-manager/request-manager.module.js';

@Module({
  imports: [
    AuthModule,
    AmocrmModule,
    RequestManagerModule,
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
  ],
})
export class AppModule {}
