import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingGateway } from './gateways/ping.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PingGateway],
})
export class AppModule {}
