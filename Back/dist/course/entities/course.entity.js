"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../../category/entities/category.entity");
const chapter_entity_1 = require("../../chapter/entities/chapter.entity");
const user_entity_1 = require("./../../user/entities/user.entity");
let Course = class Course {
};
exports.Course = Course;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Course.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        length: 50,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "certificate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "background_image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.Chapter, chapter => chapter.course, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], Course.prototype, "chapters", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    tslib_1.__metadata("design:type", Date)
], Course.prototype, "createdOn", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    tslib_1.__metadata("design:type", Date)
], Course.prototype, "modifiedOn", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Course.prototype, "mainImageUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Course.prototype, "categoriesId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, user => user.courses),
    tslib_1.__metadata("design:type", Array)
], Course.prototype, "users", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.course, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'categoriesId',
    }),
    tslib_1.__metadata("design:type", category_entity_1.Category)
], Course.prototype, "category", void 0);
exports.Course = Course = tslib_1.__decorate([
    (0, typeorm_1.Entity)('course')
], Course);
//# sourceMappingURL=course.entity.js.map