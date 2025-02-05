import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, /*Req*/Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
//import {Request} from 'express';



@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCourseDto: CreateCourseDto /*, @Req() req: Request*/) {
    return this.courseService.create(createCourseDto /*, req.user as User*/);
  }

  @Get()
  findAll(@Query() query:{ slug?: string; sort?: string; category?: string }) {
    return this.courseService.findAll(query);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
  @Post('upload')
  uploadFile(@Body() file: any) {
    console.log(file);
  }
}
