import { Injectable, BadRequestException } from '@nestjs/common';
//import { User } from '../user/user.entity'; // Adjust the import path as necessary
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Chapter } from '../chapter/entities/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from '../certificate/entities/certificate.entity';
@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Chapter)
    private readonly chapterRepo: Repository<Chapter>, // Ensure this is injected
    @InjectRepository(Certificate)
    private readonly certificateRepo: Repository<Certificate>, // Ensure this is injected
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    // Validate the input
    if (!createCourseDto || !createCourseDto.title) {
      throw new BadRequestException('Invalid course data');
    }

    // Generate a slug from the title
    const slug = createCourseDto.title.split(' ').join('_').toLowerCase();
    // Create and save the certificate
    const certificate = this.certificateRepo.create({
      name: createCourseDto.title + ' Certificate',
      imageurl: createCourseDto.certificate.imageurl,
      description: 'Certificate for ' + createCourseDto.title,
    });
    const savedCertificate = await this.certificateRepo.save(certificate);

    // Create the course entity
    const course = this.courseRepo.create({
      ...createCourseDto,
      certificate: savedCertificate,
      slug,
      chapters: [], // Initialize an empty array for chapters
    });

    // Save the course to the database
    const savedCourse = await this.courseRepo.save(course);

    // Create and save the chapters
    if (createCourseDto.chapters && createCourseDto.chapters.length > 0) {
      const chapters = createCourseDto.chapters.map((chapterDto) =>
        this.chapterRepo.create({
          ...chapterDto,
          course: savedCourse, // Associate the chapter with the course
        }),
      );
      await this.chapterRepo.save(chapters);
    }

    return savedCourse;
  }

  async findAll(query?: { slug?: string; sort?: string; category?: string }) {
    console.log('Query Parameters:', query); // Log query parameters

    const myQuery = this.courseRepo
    
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
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['chapters','category'],
      
    });
    if (!course) {
      throw new BadRequestException('Course Not Found');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepo.update(id, updateCourseDto);
  }
  
  async remove(id: number) {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (course) {
      await this.courseRepo.remove(course);
    } else {
      throw new BadRequestException('Course Not Found');
    }
    return { success: true, course };
  }
}