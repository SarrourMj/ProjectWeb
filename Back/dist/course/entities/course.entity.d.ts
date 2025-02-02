import { Chapter } from '../../chapter/entities/chapter.entity';
import { User } from './../../user/entities/user.entity';
export declare class Course {
    id: number;
    title: string;
    description: string;
    certificate: string;
    background_image: string;
    category: string;
    chapters: Chapter[];
    content: string;
    slug: string;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    users: User[];
}
