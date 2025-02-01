import { Column } from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from './../../course/entities/course.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ default: 0 })
  score: number;

  @IsArray()
  @IsString({ each: true })
  badges: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Course)
  courses: Course[];

  @IsOptional()
  @IsString()
  image?: string;
}
