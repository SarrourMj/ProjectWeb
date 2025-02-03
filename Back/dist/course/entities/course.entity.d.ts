import { Category } from '../../category/entities/category.entity';
import { Chapter } from '../../chapter/entities/chapter.entity';
import { User } from './../../user/entities/user.entity';
export declare class Course {
    id: number;
    title: string;
    certificate: string;
    background_image: string;
    chapters: Chapter[];
    content: string;
    slug: string;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    categoriesId: number;
    users: User[];
    category: Category;
}
