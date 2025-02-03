"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const course_entity_1 = require("./entities/course.entity");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../category/entities/category.entity");
const chapter_entity_1 = require("../chapter/entities/chapter.entity");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course, category_entity_1.Category, chapter_entity_1.Chapter])
        ]
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map