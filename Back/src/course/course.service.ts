import { Injectable, BadRequestException } from '@nestjs/common';
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
    private readonly chapterRepo: Repository<Chapter>,
    @InjectRepository(Certificate)
    private readonly certificateRepo: Repository<Certificate>, 
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    if (!createCourseDto || !createCourseDto.title) {
      throw new BadRequestException('Invalid course data');
    }
    console.log('Create Course DTO:', createCourseDto);
  
    // Generate a slug
    const slug = createCourseDto.title.split(' ').join('_').toLowerCase();
  
    // Create and save the certificate first
    const certificate = this.certificateRepo.create({
      name: `${createCourseDto.title} Certificate`, // Example name
      imageurl: createCourseDto.certificateImageUrl, // Set default or dynamic URL
      description: `Certificate for completing ${createCourseDto.title}`,
    });
  
    const savedCertificate = await this.certificateRepo.save(certificate);
  
    // Create the course entity with the new certificate
    const course = this.courseRepo.create({
      ...createCourseDto,
      mainimageurl: createCourseDto.mainimageurl,
      slug,
      certificate: savedCertificate, // Link certificate to course
      chapters: [],
    });
  
    const savedCourse = await this.courseRepo.save(course);
  
    // Create and save chapters if any
    if (createCourseDto.chapters?.length) {
      const chapters = createCourseDto.chapters.map(chapterDto =>
        this.chapterRepo.create({ ...chapterDto, course: savedCourse }),
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
      relations: ['chapters', 'category', 'certificate'], // Include 'certificate' relation
    });
    if (!course) {
      throw new BadRequestException('Course Not Found');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepo.findOne({ where: { id }, relations: ['certificate'] });
  
    if (!course) {
      throw new BadRequestException('Course not found');
    }
  
    Object.assign(course, updateCourseDto);
  
    return await this.courseRepo.save(course);
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