export declare class QuestionAnswerDto {
    question: string;
    answer: string;
}
export declare class CreateChapterDto {
    title: string;
    content: string;
    questions?: QuestionAnswerDto[];
    score?: number;
}
