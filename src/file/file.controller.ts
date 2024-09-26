import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { FileService } from './file.service';

@Controller('upload')
@Roles('admin')
@UseGuards(RolesGuard)
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.handleFileUpload(file);
    }
}
