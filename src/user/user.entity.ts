import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('User')
export class User {
    @PrimaryColumn({ generated: 'uuid', type: 'string' })
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column('int', { array: true, default: [] })
    favorites?: string[];
}
