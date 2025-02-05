import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Course])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
