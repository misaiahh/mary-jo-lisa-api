import { Test, TestingModule } from '@nestjs/testing';
import { PingGateway } from './ping.gateway';

describe('PingGateway', () => {
  let gateway: PingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingGateway],
    }).compile();

    gateway = module.get<PingGateway>(PingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
