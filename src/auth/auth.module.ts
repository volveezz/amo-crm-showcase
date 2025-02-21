import { Module } from '@nestjs/common';
import { RequestManagerModule } from '../common/request-manager/request-manager.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [RequestManagerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
