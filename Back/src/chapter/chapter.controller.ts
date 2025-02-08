import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Roles } from '../auth/assets/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get()
  findAll() {
    return this.chapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(+id, updateChapterDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterService.remove(+id);
  }
}
