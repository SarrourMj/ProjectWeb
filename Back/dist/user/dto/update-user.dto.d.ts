import { Course } from './../../course/entities/course.entity';
export declare class UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    score?: number;
    courses?: Course[];
    badges?: string[];
    image?: string;
}
