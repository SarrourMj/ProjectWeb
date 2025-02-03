import { IsString, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
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

  @ValidateNested()
  @Type(() => Role)
  @IsOptional()
  role?: Role;

  // Student-specific properties
  @IsOptional()
  score?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Course)
  courses?: Course[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  badges?: string[];
}