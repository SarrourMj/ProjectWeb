/*import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateChapterDto } from './../../chapter/dto/update-chapter.dto';*/
import { CreateCourseDto } from 'src/course/dto/create-course.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCourseDto extends PartialType(CreateCourseDto){
   /*
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    certificate?: string; // Optional certificate

    @IsString()
    @IsOptional()
    category?: string; // Optional category

    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in the array
    @Type(() => UpdateChapterDto) // Transform the array items into UpdateChapterDto
    @IsOptional()
    chapters?: UpdateChapterDto[]; // Optional array of chapters
    */
}