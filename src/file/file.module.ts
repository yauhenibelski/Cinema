import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { File } from './file.entity';
import { path } from 'app-root-path';

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        ServeStaticModule.forRoot({
            rootPath: `${path}/upload`,
            serveRoot: '/upload',
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}
