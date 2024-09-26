import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenre } from './dto/create-genre.dto';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { Genre } from './genre.entity';

@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @Get()
    getAll(@Query() query: Partial<CreateGenre>): Promise<Genre[]> {
        return this.genreService.getAll(query);
    }

    @Post()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateGenre) {
        return this.genreService.create(dto);
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(RolesGuard)
    delete(@Param('id') id: string) {
        return this.genreService.delete(id);
    }
}
