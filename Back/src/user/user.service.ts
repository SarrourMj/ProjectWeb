import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Course } from './../course/entities/course.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Chapter } from 'src/chapter/entities/chapter.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['courses'] });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User  | null> {
    return this.userRepository.findOne({ where: { email } ,
      relations: ['role']});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOne({ where: { id }, relations: ['courses'] });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async enrollCourse(userId: number, courseId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['courses'] });
    const course = await this.courseRepository.findOne({ where: { id: courseId } });

    if (!user || !course) {
      throw new Error('User or Course not found');
    }

    if (!user.courses) {
      user.courses = [];
    }

    user.courses.push(course);
    return this.userRepository.save(user);
  }
  async completeChapter(userId: number, chapterId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['chapters'] });
    const chapter = await this.chapterRepository.findOne({ where: { id: chapterId } });

    if (!user || !chapter) {
      throw new Error('User or chapter not found');
    }

    if (!user.chapters) {
      user.chapters = [];
    }

    user.chapters.push(chapter);
    return this.userRepository.save(user);
  }


  async getUserCourses(userId: number): Promise<Course[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['courses'] });

    if (!user) {
      throw new Error('User not found');
    }

    return user.courses || [];
  }
  async getUserChapters(userId: number): Promise<Chapter[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['chapters'] });

    if (!user) {
      throw new Error('User not found');
    }

    return user.chapters || [];
  }
  async incrementUserScore(userId: number, score: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    user.score = (user.score || 0) + score;
    await this.userRepository.save(user);
  }
  
}