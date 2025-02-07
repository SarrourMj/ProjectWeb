import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, /*Req*/Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'courseImage', maxCount: 1 },
      { name: 'certificateImage', maxCount: 1 }
    ],
    {
      storage: diskStorage({
        destination: (_req, file, cb) => {
          let uploadPath = './uploads';
          if (file.fieldname === 'courseImage') {
            uploadPath += '/courses';
          } else if (file.fieldname === 'certificateImage') {
            uploadPath += '/certificates';
          }
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        }
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }
    }
  ))
  async create(
    @UploadedFiles() files: { 
      courseImage?: Express.Multer.File[],
      certificateImage?: Express.Multer.File[] 
    },
    @Body() createCourseDto: CreateCourseDto
  ) {
    const courseImageUrl = files.courseImage?.[0] 
      ? `/uploads/courses/${files.courseImage[0].filename}`
      : null;

    const certificateImageUrl = files.certificateImage?.[0]
      ? `/uploads/certificates/${files.certificateImage[0].filename}`
      : null;

    const courseData = {
      ...createCourseDto,
      mainimageurl: courseImageUrl,
      certificate: certificateImageUrl ? {
        imageurl: certificateImageUrl,
        name: `${createCourseDto.title} Certificate`,
        description: `Certificate for ${createCourseDto.title}`
      }
    };

    return this.courseService.create(courseData);
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
  
}
