import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { Role } from './entities/role.entity';
import { UserService } from './user.service';
import { Chapter } from 'src/chapter/entities/chapter.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User,Course,Chapter,Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
