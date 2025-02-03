import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    findAll(query: {
        slug?: string;
        sort?: string;
        category?: string;
    }): Promise<import("./entities/course.entity").Course[]>;
    findOne(id: string): Promise<import("./entities/course.entity").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        success: boolean;
        course: import("./entities/course.entity").Course;
    }>;
}
