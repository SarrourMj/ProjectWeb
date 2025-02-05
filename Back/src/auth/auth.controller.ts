import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Roles } from './assets/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('login controller');
    console.log(req.user.role);
    console.log('login controller');
    return this.authService.login(req.user);
  }

  @UseGuards(RolesGuard)
  @Get('test-role')
  @Roles('admin')
  async testRole() {
    return { message: 'You have the student role!' };
  }
}