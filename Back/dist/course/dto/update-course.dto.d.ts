import { UpdateChapterDto } from './../../chapter/dto/update-chapter.dto';
export declare class UpdateCourseDto {
    title?: string;
    certificate?: string;
    category?: string;
    chapters?: UpdateChapterDto[];
}
