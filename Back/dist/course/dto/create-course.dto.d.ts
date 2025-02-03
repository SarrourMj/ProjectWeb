import { CreateChapterDto } from './../../chapter/dto/create-chapter.dto';
import { Category } from 'src/category/entities/category.entity';
export declare class CreateCourseDto {
    title: string;
    content: string;
    mainImageUrl: string;
    certificate?: string;
    category: Category;
    categoriesId: number;
    chapters: CreateChapterDto[];
}
