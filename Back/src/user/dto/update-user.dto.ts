import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from './../../course/entities/course.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  score?: number;

  @IsArray()
  @IsOptional()
  @Type(() => Course)
  courses?: Course[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  badges?: string[];
}