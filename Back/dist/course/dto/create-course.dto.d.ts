import { CreateChapterDto } from './../../chapter/dto/create-chapter.dto';
export declare class CreateCourseDto {
    title: string;
    content: string;
    mainImageUrl: string;
    certificate?: string;
    category: string;
    chapters: CreateChapterDto[];
}
