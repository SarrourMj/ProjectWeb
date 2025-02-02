import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from './../../course/entities/course.entity';
import { Role } from './../../user/entities/role.entity';

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
  @IsString()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Role)
  @IsOptional()
  roles?: Role[];

  // Student-specific properties
  @IsOptional()
  score?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Course)
  courses?: Course[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  badges?: string[];
}