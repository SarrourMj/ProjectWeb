import { Column } from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Course } from './../../course/entities/course.entity';
import { Role } from './../../user/entities/role.entity';

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

  @IsOptional()
  @IsString()
  image?: string;

  @ValidateNested()
  @Type(() => Role)
  role: Role;

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
