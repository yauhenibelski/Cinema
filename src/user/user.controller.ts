import { Body, Controller, Get, Patch, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { UserService } from './user.service';
import { PasswordDto } from './dto/password.dto';
import { User as UserEntity } from './user.entity';
import { User } from 'src/utils/user';
import { EmailDto } from './dto/email.dto';



@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch('password')
    @UsePipes(new ValidationPipe())
    async updatePassword(@Body() dto: PasswordDto, @User() user: UserEntity) {
        return this.userService.updatePassword(dto, user)
    }

    @Patch('email')
    @UsePipes(new ValidationPipe())
    async updateEmail(@Body() dto: EmailDto, @User() user: UserEntity) {
        return this.userService.updateEmail(dto, user)
    }
    @Get()
    @Roles('admin')
    user(@Query('email') email: string) {
        return this.userService.get(email);
    }
}
