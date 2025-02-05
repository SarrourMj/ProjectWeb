import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Course } from './../course/entities/course.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Role) // Inject Role Repository
    private readonly roleRepository: Repository<Role>,
  ) {}


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Set default role ID to 1
    const defaultRole = await this.roleRepository.findOne({ where: { id: 1 } });
    if (!defaultRole) {
      throw new Error('Default role not found');
    }
  
    // Create new user instance
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: defaultRole, // Assign the default role
    });
  
    // Save user to the database
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

  async getUserCourses(userId: number): Promise<Course[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['courses'] });

    if (!user) {
      throw new Error('User not found');
    }

    return user.courses || [];
  }
}