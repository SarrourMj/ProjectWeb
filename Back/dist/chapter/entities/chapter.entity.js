"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("./../../course/entities/course.entity");
let Chapter = class Chapter {
};
exports.Chapter = Chapter;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Chapter.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], Chapter.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], Chapter.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], Chapter.prototype, "questions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Chapter.prototype, "score", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.chapters, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", course_entity_1.Course)
], Chapter.prototype, "course", void 0);
exports.Chapter = Chapter = tslib_1.__decorate([
    (0, typeorm_1.Entity)('chapter')
], Chapter);
//# sourceMappingURL=chapter.entity.js.map