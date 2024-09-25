import { Body, Controller, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserService } from './user.service';
import { PasswordDto } from './dto/password.dto';
import { User as UserEntity } from './user.entity';
import { User } from 'src/utils/user';



@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch('password')
    @UsePipes(new ValidationPipe())
    async getById(@Body() dto: PasswordDto, @User() user: UserEntity) {
        return this.userService.updatePassword(dto, user)
    }
}
