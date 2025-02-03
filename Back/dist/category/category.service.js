"use strict";
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = CategoryService_1 = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.logger = new common_1.Logger(CategoryService_1.name);
    }
    async create(createCategoryDto) {
        this.logger.log('Received DTO:', createCategoryDto);
        try {
            const category = this.categoryRepository.create(createCategoryDto);
            const result = await this.categoryRepository.save(category);
            this.logger.log('Category created:', result);
            return result;
        }
        catch (error) {
            this.logger.error('Error creating category:', error);
            throw new common_1.BadRequestException('Failed to create category');
        }
    }
    async findAll() {
        return await this.categoryRepository.find();
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.BadRequestException('Category not found');
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (!category) {
            throw new common_1.BadRequestException(`Category not found`);
        }
        Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(category);
    }
    async remove(id) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.BadRequestException(`Category with ID ${id} not found`);
        }
        return { message: 'Category deleted successfully' };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = CategoryService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map