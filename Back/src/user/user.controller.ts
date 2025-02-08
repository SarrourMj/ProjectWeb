import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { Chapter } from 'src/chapter/entities/chapter.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post(':userId/increment-score/:score')
  async incrementUserScore(
    @Param('userId') userId: number,
    @Param('score') score: number
  ): Promise<User> {
    return this.userService.incrementUserScore(userId, score);
  }
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get(':id/score')
  async getScore(@Param('id') id: number) {
  const user = await this.userService.findOne(id);
  return user.score; // Return only the score
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
  @Post(':userId/complete/:chapterId')
  async completeChapter(
    @Param('userId') userId: number,
    @Param('chapterId') chapterId: number
  ): Promise<User> {
    return this.userService.completeChapter(userId, chapterId);
  }

  @Get(':userId/courses')
  async getUserCourses(@Param('userId') userId: number): Promise<Course[]> {
    return this.userService.getUserCourses(userId);
  }
  @Get(':userId/chapters')
  async getUserChapters(@Param('userId') userId: number): Promise<Chapter[]> {
    return this.userService.getUserChapters(userId);
  }
}
