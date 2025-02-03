import { Injectable, BadRequestException } from '@nestjs/common';
//import { User } from '../user/user.entity'; // Adjust the import path as necessary
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private readonly repo: Repository<Course>) {
  }
  
  async create(createCourseDto: CreateCourseDto ) {
    console.log('Received DTO:', createCourseDto); // Add this line for debugging
    if (!createCourseDto || !createCourseDto.title|| !createCourseDto.categoriesId) {
      throw new BadRequestException('Invalid course data');
    }
    const slug = createCourseDto.title.split(" ").join('_').toLowerCase();
    return await this.repo.insert({...createCourseDto, slug});
  
  }

  async findAll(query?: { slug?: string; sort?: string; category?: string }) {
    console.log('Query Parameters:', query); // Log query parameters

    const myQuery = this.repo
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category'); // Join with the 'category' table
  
    if (query && Object.keys(query).length > 0) {
      const queryKeys = Object.keys(query); // Get the keys of the query object
  
      if (queryKeys.includes('slug')) {
        myQuery.where('course.slug LIKE :slug', { slug: `%${query['slug']}%` });
      }
  
      // Sort by title (if provided)
      if (queryKeys.includes('sort')) {
        const sortOrder = query['sort']?.toUpperCase(); // Convert to uppercase (ASC or DESC)
        if (sortOrder === 'ASC' || sortOrder === 'DESC') {
          myQuery.orderBy('course.title', sortOrder);
        } else {
          throw new Error('Invalid sort order. Use "asc" or "desc".');
        }
      }
  
      // Filter by category (if provided)
      if (queryKeys.includes('category')) {
        myQuery.andWhere('category.title = :cat', { cat: query['category'] });
      }
    }
  
    // Execute the query and return the results
    return await myQuery.getMany();
  }

  async findOne(id: number) {
  const c= await this.repo.findOne({ where: { id } }) ;
  if (!c){
    throw new BadRequestException ('Course Not Found');
  }
  return c;
   }

 async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.repo.update(id,updateCourseDto) ;
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Course with ID ${id} not found`);
    }
    return { message: 'Course deleted successfully' };
  }
  
}
