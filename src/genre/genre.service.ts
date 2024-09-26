import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateGenre } from './dto/create-genre.dto';
import { mapValues } from 'lodash';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}

    async getAll(query?: Partial<CreateGenre>): Promise<Genre[]> {
        let option: FindOptionsWhere<Genre> = {};

        if (query) {
            option = mapValues(query, (value) => {
                return ILike(`%${value}%`);
            });
        }

        return this.genreRepository.findBy(option);
    }

    async create(dto: CreateGenre): Promise<Genre> {
        const genre = this.genreRepository.create(dto);

        return this.genreRepository.save(genre);
    }

    async delete(id: string): Promise<void> {
        const genre = await this.genreRepository.findOneBy({ id });

        if (!genre) {
            throw new BadRequestException('Genre not found');
        }

        this.genreRepository.delete({ id });
    }
}
