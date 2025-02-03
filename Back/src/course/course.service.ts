import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Chapter } from '../chapter/entities/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Chapter)
    private readonly chapterRepo: Repository<Chapter>, // Ensure this is injected
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    // Validate the input
    if (!createCourseDto || !createCourseDto.title) {
      throw new BadRequestException('Invalid course data');
    }

    // Generate a slug from the title
    const slug = createCourseDto.title.split(' ').join('_').toLowerCase();

    // Create the course entity
    const course = this.courseRepo.create({
      ...createCourseDto,
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

  async findAll() {
    return await this.courseRepo.find({ relations: ['chapters'] }); // Include chapters in the response
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['chapters'], // Include chapters in the response
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
    const result = await this.courseRepo.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Course with ID ${id} not found`);
    }
    return { message: 'Course deleted successfully' };
  }
}