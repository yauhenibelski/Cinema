import { IsString, IsUUID, MinLength } from 'class-validator';
export class PasswordDto {
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(6)
    currentPassword: string;

    @IsString()
    @MinLength(6)
    newPassword: string;
}
