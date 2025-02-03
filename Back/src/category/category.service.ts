import { Injectable, BadRequestException , Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  private readonly logger = new Logger(CategoryService.name);


  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    this.logger.log('Received DTO:', createCategoryDto); 

    try {
      const category = this.categoryRepository.create(createCategoryDto);
      const result = await this.categoryRepository.save(category);
      this.logger.log('Category created:', result); 
      return result;
    } catch (error) {
      this.logger.error('Error creating category:', error); 
      throw new BadRequestException('Failed to create category');
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if(!category) {
      throw new BadRequestException(`Category not found`); 
    }
    Object.assign(category, updateCategoryDto); 
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Category with ID ${id} not found`);
    }
    return { message: 'Category deleted successfully' };
  }
}