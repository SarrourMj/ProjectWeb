"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const course_entity_1 = require("./entities/course.entity");
const chapter_entity_1 = require("../chapter/entities/chapter.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CourseService = class CourseService {
    constructor(courseRepo, chapterRepo) {
        this.courseRepo = courseRepo;
        this.chapterRepo = chapterRepo;
    }
    async create(createCourseDto) {
        if (!createCourseDto || !createCourseDto.title) {
            throw new common_1.BadRequestException('Invalid course data');
        }
        const slug = createCourseDto.title.split(' ').join('_').toLowerCase();
        const course = this.courseRepo.create({
            ...createCourseDto,
            slug,
            chapters: [],
        });
        const savedCourse = await this.courseRepo.save(course);
        if (createCourseDto.chapters && createCourseDto.chapters.length > 0) {
            const chapters = createCourseDto.chapters.map((chapterDto) => this.chapterRepo.create({
                ...chapterDto,
                course: savedCourse,
            }));
            await this.chapterRepo.save(chapters);
        }
        return savedCourse;
    }
    async findAll(query) {
        console.log('Query Parameters:', query);
        const myQuery = this.courseRepo
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.category', 'category');
        if (query && Object.keys(query).length > 0) {
            const queryKeys = Object.keys(query);
            if (queryKeys.includes('slug')) {
                myQuery.where('course.slug LIKE :slug', { slug: `%${query['slug']}%` });
            }
            if (queryKeys.includes('sort')) {
                const sortOrder = query['sort']?.toUpperCase();
                if (sortOrder === 'ASC' || sortOrder === 'DESC') {
                    myQuery.orderBy('course.title', sortOrder);
                }
                else {
                    throw new Error('Invalid sort order. Use "asc" or "desc".');
                }
            }
            if (queryKeys.includes('category')) {
                myQuery.andWhere('category.title = :cat', { cat: query['category'] });
            }
        }
        return await myQuery.getMany();
    }
    async findOne(id) {
        const course = await this.courseRepo.findOne({
            where: { id },
            relations: ['chapters'],
        });
        if (!course) {
            throw new common_1.BadRequestException('Course Not Found');
        }
        return course;
    }
    async update(id, updateCourseDto) {
        return await this.courseRepo.update(id, updateCourseDto);
    }
    async remove(id) {
        const result = await this.courseRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.BadRequestException(`Course with ID ${id} not found`);
        }
        return { message: 'Course deleted successfully' };
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CourseService);
//# sourceMappingURL=course.service.js.map