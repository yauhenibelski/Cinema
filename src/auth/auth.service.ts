import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { hash, compare, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async getAccessToken(authorizationHeader: string | undefined) {
        if (!authorizationHeader) {
            throw new BadRequestException('Please provide access token');
        }

        const [, token] = authorizationHeader.split(' ');
        const result = await this.jwtService.verifyAsync(token);

        if (!result['id']) {
            throw new UnauthorizedException('Invalid token');
        }

        return this.issueTokenPair({ id: result['id'] });
    }

    async singIn(dto: AuthDto) {
        const user = await this.validateUser(dto);

        return await this.returnUserFields(user);
    }

    async singUp(dto: AuthDto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
        });

        if (user) {
            throw new BadRequestException(
                'User with that email address already exists',
            );
        }

        const salt = await genSalt();
        const password = await hash(dto.password, salt);

        const createUser = this.userRepository.create({ ...dto, password });
        const newUser = await this.userRepository.save(createUser);

        return await this.returnUserFields(newUser);
    }

    private async issueTokenPair(id: Pick<User, 'id'>) {
        const accessToken = await this.jwtService.signAsync(id, {
            expiresIn: '1h',
        });
        const refreshToken = await this.jwtService.signAsync(id);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async validateUser({ email, password }: AuthDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong password');
        }

        return user;
    }

    private async returnUserFields({ email, id }: User) {
        const tokens = await this.issueTokenPair({ id });

        return {
            id,
            email,
            ...tokens,
        };
    }
}
