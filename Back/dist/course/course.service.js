"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_entity_1 = require("./entities/course.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CourseService = class CourseService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createCourseDto) {
        console.log('Received DTO:', createCourseDto);
        if (!createCourseDto || !createCourseDto.title) {
            throw new common_1.BadRequestException('Invalid course data');
        }
        const slug = createCourseDto.title.split(" ").join('_').toLowerCase();
        return await this.repo.insert({ ...createCourseDto, slug });
    }
    async findAll() {
        return await this.repo.find();
    }
    async findOne(id) {
        const c = await this.repo.findOne({ where: { id } });
        if (!c) {
            throw new common_1.BadRequestException('Course Not Found');
        }
        return c;
    }
    async update(id, updateCourseDto) {
        return await this.repo.update(id, updateCourseDto);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new common_1.BadRequestException(`Course with ID ${id} not found`);
        }
        return { message: 'Course deleted successfully' };
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseService);
//# sourceMappingURL=course.service.js.map