"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_chapter_dto_1 = require("./../../chapter/dto/create-chapter.dto");
const category_entity_1 = require("../../category/entities/category.entity");
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "mainImageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateCourseDto.prototype, "certificate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", category_entity_1.Category)
], CreateCourseDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCourseDto.prototype, "categoriesId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_chapter_dto_1.CreateChapterDto),
    tslib_1.__metadata("design:type", Array)
], CreateCourseDto.prototype, "chapters", void 0);
//# sourceMappingURL=create-course.dto.js.map