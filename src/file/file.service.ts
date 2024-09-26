import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { writeFile } from 'fs/promises';
import { path } from 'app-root-path';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
    ) {}

    async handleFileUpload(file: Express.Multer.File) {
        const filePath = `${path}/upload/${file.originalname}`;

        await writeFile(filePath, file.buffer);

        const newFile = this.fileRepository.create({
            filename: file.originalname,
            path: `upload/${file.originalname}`,
            size: file.size,
        });

        return this.fileRepository.save(newFile);
    }
}
