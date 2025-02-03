"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const chapter_service_1 = require("./chapter.service");
const create_chapter_dto_1 = require("./dto/create-chapter.dto");
const update_chapter_dto_1 = require("./dto/update-chapter.dto");
let ChapterController = class ChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    create(createChapterDto) {
        return this.chapterService.create(createChapterDto);
    }
    findAll() {
        return this.chapterService.findAll();
    }
    findOne(id) {
        return this.chapterService.findOne(+id);
    }
    update(id, updateChapterDto) {
        return this.chapterService.update(+id, updateChapterDto);
    }
    remove(id) {
        return this.chapterService.remove(+id);
    }
};
exports.ChapterController = ChapterController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_chapter_dto_1.CreateChapterDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ChapterController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ChapterController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ChapterController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, update_chapter_dto_1.UpdateChapterDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ChapterController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ChapterController.prototype, "remove", null);
exports.ChapterController = ChapterController = tslib_1.__decorate([
    (0, common_1.Controller)('chapter'),
    tslib_1.__metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
//# sourceMappingURL=chapter.controller.js.map