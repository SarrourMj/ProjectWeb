import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Chapter } from '../chapter/entities/chapter.entity';
import { Repository } from 'typeorm';
export declare class CourseService {
    private readonly courseRepo;
    private readonly chapterRepo;
    constructor(courseRepo: Repository<Course>, chapterRepo: Repository<Chapter>);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(query?: {
        slug?: string;
        sort?: string;
        category?: string;
    }): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<{
        success: boolean;
        course: Course;
    }>;
}
