import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('File')
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    size: number;
}
