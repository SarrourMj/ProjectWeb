import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    create(createChapterDto: CreateChapterDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChapterDto: UpdateChapterDto): string;
    remove(id: string): string;
}
