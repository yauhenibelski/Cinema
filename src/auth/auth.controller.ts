import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Headers,
    Get,
    UseGuards,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('singup')
    @UsePipes(new ValidationPipe())
    async singUp(@Body() dto: AuthDto) {
        return this.authService.singUp(dto);
    }

    @Post('singin')
    @UsePipes(new ValidationPipe())
    async singIn(@Body() dto: AuthDto) {
        return this.authService.singIn(dto);
    }

    @Get('access')
    @UseGuards(RolesGuard)
    async getAccessToken(@Headers() headers: { authorization: string }) {
        return this.authService.getAccessToken(headers.authorization);
    }
}
