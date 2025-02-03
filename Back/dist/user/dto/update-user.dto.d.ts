import { Course } from './../../course/entities/course.entity';
import { Role } from './../../user/entities/role.entity';
export declare class UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    image?: string;
    role?: Role;
    score?: number;
    courses?: Course[];
    badges?: string[];
}
