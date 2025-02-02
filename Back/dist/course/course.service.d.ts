import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
export declare class CourseService {
    private readonly repo;
    constructor(repo: Repository<Course>);
    create(createCourseDto: CreateCourseDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
