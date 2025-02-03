import { Course } from './../../course/entities/course.entity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    image?: string;
    role: Role;
    score?: number;
    courses?: Course[];
    badges?: string[];
}
