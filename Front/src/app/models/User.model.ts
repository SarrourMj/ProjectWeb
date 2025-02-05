// user.model.ts
import { Course } from './course.model'; // Adjust the import path as necessary
import { Chapter} from './chapter.model'
export interface Role {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    password?: string; // Optional because we don't want to expose it everywhere
    image?: string;
    role: Role;
    score?: number;
    courses?: Course[];
    badges?: string[];
    chapters?:Chapter[];
  }
  
  // For create/update operations
  export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    roleId: number;
    image?: string;
  }
  
  export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    roleId?: number;
    image?: string;
    score?: number;
    badges?: string[];
  }