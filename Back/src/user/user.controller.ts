import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException ,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/assets/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import * as bcrypt from 'bcrypt';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post(':userId/increment-score/:score')
  async incrementUserScore(
    @Param('userId') userId: number,
    @Param('score') score: number
  ): Promise<void> {
    return this.userService.incrementUserScore(userId, score);
  }
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id/score')
  async getScore(@Param('id') id: number) {
  const user = await this.userService.findOne(id);
  return user.score; // Return only the score
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post(':userId/enroll/:courseId')
  async enrollCourse(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number
  ): Promise<User> {
    return this.userService.enrollCourse(userId, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/complete/:chapterId')
  async completeChapter(
    @Param('userId') userId: number,
    @Param('chapterId') chapterId: number
  ): Promise<User> {
    return this.userService.completeChapter(userId, chapterId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/courses')
  async getUserCourses(@Param('userId') userId: number): Promise<Course[]> {
    return this.userService.getUserCourses(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/chapters')
  async getUserChapters(@Param('userId') userId: number): Promise<Chapter[]> {
    return this.userService.getUserChapters(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/change-password')
  async changePassword(@Param('userId') userId: number, @Body() body) {
    const { currentPassword, newPassword } = body;
    const user = await this.userService.findOne(userId);
    if(!user) {
      throw new BadRequestException('User not found');
    }
    console.log(await bcrypt.compare(currentPassword, user.password));
    if ( !(await bcrypt.compare(currentPassword, user.password))) {
      
      throw new BadRequestException('Current password is incorrect');
    }

    await this.userService.changePassword(user.id, newPassword);
    return { message: 'Password updated successfully' };
  }
}
