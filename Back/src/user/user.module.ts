import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { UserService } from './user.service';
import { Chapter } from 'src/chapter/entities/chapter.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,Course,Chapter])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
