import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateChapterDto } from './../../chapter/dto/update-chapter.dto';

export class UpdateCourseDto {
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
}