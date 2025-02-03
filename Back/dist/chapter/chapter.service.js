"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ChapterService = class ChapterService {
    create(_createChapterDto) {
        return 'This action adds a new chapter';
    }
    findAll() {
        return `This action returns all chapter`;
    }
    findOne(id) {
        return `This action returns a #${id} chapter`;
    }
    update(id, _updateChapterDto) {
        return `This action updates a #${id} chapter`;
    }
    remove(id) {
        return `This action removes a #${id} chapter`;
    }
};
exports.ChapterService = ChapterService;
exports.ChapterService = ChapterService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ChapterService);
//# sourceMappingURL=chapter.service.js.map