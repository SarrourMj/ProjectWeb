import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChapterDto } from './../../chapter/dto/create-chapter.dto';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    certificate?: string; // Optional certificate (e.g., URL or badge name)

    @IsString()
    @IsNotEmpty()
    category: string; // Category as a string

    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in the array
    @Type(() => CreateChapterDto) // Transform the array items into CreateChapterDto
    chapters: CreateChapterDto[]; // Array of chapters
}