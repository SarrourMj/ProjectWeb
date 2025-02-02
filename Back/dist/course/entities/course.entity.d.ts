import { Chapter } from '../../chapter/entities/chapter.entity';
export declare class Course {
    id: number;
    title: string;
    certificate: string;
    category: string;
    content: string;
    slug: string;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    chapters: Chapter[];
}
