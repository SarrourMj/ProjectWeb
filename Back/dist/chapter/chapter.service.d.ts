import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class ChapterService {
    create(_createChapterDto: CreateChapterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, _updateChapterDto: UpdateChapterDto): string;
    remove(id: number): string;
}
