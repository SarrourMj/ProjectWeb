import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CourseModule, ChapterModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
