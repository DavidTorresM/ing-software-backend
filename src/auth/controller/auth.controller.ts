import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.body;
    }
}
