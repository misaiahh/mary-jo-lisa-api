import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('getProfile', () => {
    it('should return a user object', () => {
      const request = {
        user: {
          userId: 1,
          username: 'john',
        },
      };
      const response = {
        userId: 1,
        username: 'john',
      };
      expect(authController.getProfile(request)).toStrictEqual(response);
    });
  });

  describe('login', () => {
    it('should return an object with an "access_token"', async () => {
      const request = {
        user: {
          userId: 1,
          username: 'john',
        },
      };
      const result = await authController.login(request);
      expect(result.access_token).toBeTruthy();
    });
  });
});
