import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Genre')
export class Genre {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;
}
