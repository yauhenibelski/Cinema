import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Roles } from 'src/types/roles.type';

@Entity('User')
export class User {
    @PrimaryColumn({ generated: 'uuid', type: 'string' })
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column('simple-array', { default: 'user' })
    roles: Roles;

    @Column('int', { array: true, default: [] })
    favorites?: string[];
}
