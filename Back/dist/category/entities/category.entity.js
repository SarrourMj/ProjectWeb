"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../course/entities/course.entity");
let Category = class Category {
};
exports.Category = Category;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => course_entity_1.Course, course => course.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "course", void 0);
exports.Category = Category = tslib_1.__decorate([
    (0, typeorm_1.Entity)('categories')
], Category);
//# sourceMappingURL=category.entity.js.map