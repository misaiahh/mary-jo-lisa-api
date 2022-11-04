import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';

import { AuthModule } from './../src/auth.module';
import { jwtConstants } from '../src/constants';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    });
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' })
      .expect(201);
    expect(response.body.access_token).toBeTruthy();
  });

  it('/profile (GET)', async () => {
    const token = jwtService.sign({ username: 'john', sub: 1 });
    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.username).toBe('john');
  });
});
