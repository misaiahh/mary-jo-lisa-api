import { Injectable } from '@nestjs/common';

import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(private user: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.user.findOne(username);

    if (user && user.password == pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
