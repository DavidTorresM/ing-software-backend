import { Controller, Request, Get, Post,Body, UseGuards,HttpException,HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginDTO, RespuestaLogin } from '../interfaces/auth.interface';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() login : LoginDTO ) {
      const user:RespuestaLogin = await this.authService.login(login);
      return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.body;
    }
}
