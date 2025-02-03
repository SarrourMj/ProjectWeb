"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChapterDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_chapter_dto_1 = require("./create-chapter.dto");
class UpdateChapterDto {
}
exports.UpdateChapterDto = UpdateChapterDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateChapterDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateChapterDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_chapter_dto_1.QuestionAnswerDto),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], UpdateChapterDto.prototype, "questions", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateChapterDto.prototype, "score", void 0);
//# sourceMappingURL=update-chapter.dto.js.map