import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PingGateway {
  logger = new Logger(PingGateway.name);

  @SubscribeMessage('ping')
  handleMessage(@MessageBody() message: any): WsResponse<string> {
    this.logger.log(`Message received "${message}"`);
    return { event: 'ping', data: 'pong' };
  }
}
