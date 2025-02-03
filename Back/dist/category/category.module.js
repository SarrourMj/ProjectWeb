"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_controller_1 = require("./category.controller");
const category_entity_1 = require("./entities/category.entity");
const typeorm_1 = require("@nestjs/typeorm");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map