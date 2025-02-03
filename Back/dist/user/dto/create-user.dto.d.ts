import { Course } from './../../course/entities/course.entity';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    score: number;
    badges: string[];
    courses: Course[];
    image?: string;
}
