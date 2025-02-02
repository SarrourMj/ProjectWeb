import { QuestionAnswerDto } from './create-chapter.dto';
export declare class UpdateChapterDto {
    title?: string;
    content?: string;
    questions?: QuestionAnswerDto[];
    score?: number;
}
