import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CourseModule } from './course/course.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Course } from './course/entities/course.entity';
import { Chapter } from './chapter/entities/chapter.entity';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
// import { AdminModule } from './admin/admin.module'; // Ensure this module exists or correct the path

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User,Course,Chapter, Category,Role],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CourseModule,
    ChapterModule,
    UserModule,
    // AdminModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
