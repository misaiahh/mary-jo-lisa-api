import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });
  await app.listen(3001);
}
bootstrap();
