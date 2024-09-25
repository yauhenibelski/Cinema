import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PasswordDto } from './dto/password.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly useRepository: Repository<User>,
    ) {}

    async updatePassword(
        { id, currentPassword, newPassword }: PasswordDto,
        ctxUser: User,
    ): Promise<void> {
        const user = await this.useRepository.findOneBy({ id });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (!this.isAdmin(ctxUser) && id !== user.id) {
            throw new BadRequestException('Wrong id');
        }

        const isPasswordValid = await compare(currentPassword, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Wrong password');
        }
        const salt = await genSalt();
        const password = await hash(newPassword, salt);

        this.useRepository.update(id, { password });
    }

    async updateEmail(
        { currentEmail, newEmail, id }: EmailDto,
        ctxUser: User,
    ): Promise<void> {
        const user = await this.useRepository.findOneBy({ id });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (!this.isAdmin(ctxUser) && currentEmail !== user.email) {
            throw new BadRequestException('Wrong email');
        }

        this.useRepository.update(id, { email: newEmail });
    }

    private isAdmin(user: User): boolean {
        return user.roles.includes('admin');
    }
}
