// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('User found:', user);
        console.log('Password valid:', isPasswordValid);
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.id, role: user.role};
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        email: user.email,
        score: user.score,
        id: user.id,
        role: user.role.name
      },

    };
  }
  
  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }


}