import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDocument } from 'src/modules/users/schemas/user.schemas';
import { Auth, GetUser } from '../decorators';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<Object> {
        return this.authService.login(loginDto);
    }

    @Get('check-status')
    @Auth()
    checkAuthStatus(
        @GetUser() user: UserDocument
    ) {
        return this.authService.checkAuthStatus(user);
    }
}
