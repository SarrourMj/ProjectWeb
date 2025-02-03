import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity';
import { TypeOrmModule} from "@nestjs/typeorm"
import { Chapter } from '../chapter/entities/chapter.entity';
@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([Course,Chapter])
  ]
})
export class CourseModule {}
