import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
  @Post(':userId/enroll/:courseId')
  async enrollCourse(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number
  ): Promise<User> {
    return this.userService.enrollCourse(userId, courseId);
  }

  @Get(':userId/courses')
  async getUserCourses(@Param('userId') userId: number): Promise<Course[]> {
    return this.userService.getUserCourses(userId);
  }
}
