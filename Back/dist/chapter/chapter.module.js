"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const chapter_service_1 = require("./chapter.service");
const chapter_controller_1 = require("./chapter.controller");
let ChapterModule = class ChapterModule {
};
exports.ChapterModule = ChapterModule;
exports.ChapterModule = ChapterModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [chapter_controller_1.ChapterController],
        providers: [chapter_service_1.ChapterService],
    })
], ChapterModule);
//# sourceMappingURL=chapter.module.js.map