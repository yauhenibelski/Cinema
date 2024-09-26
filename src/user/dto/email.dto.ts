import { IsEmail, IsUUID } from 'class-validator';

export class EmailDto {
    @IsUUID()
    id: string;

    @IsEmail()
    currentEmail: string;

    @IsEmail()
    newEmail: string;
}
