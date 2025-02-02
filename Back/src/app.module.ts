import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CourseModule, 
    ChapterModule, 
    UserModule,
     AdminModule, 
     ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigModule global
      envFilePath: '.env', // Specify the path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load entities automatically
      }),
    }),],
  controllers: [AppController],
})
export class AppModule {}
