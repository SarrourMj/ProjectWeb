import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChapterDto } from './../../chapter/dto/create-chapter.dto';
import { Category } from 'src/category/entities/category.entity'; // Import Category type
import { CreateCertificateDto } from 'src/certificate/dto/create-certificate.dto';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string; 

    @IsString()
    @IsOptional()
    content:string;

    @IsOptional()
    @IsString() 
    mainImageUrl: string;

    @IsOptional()
    certificate: CreateCertificateDto; 
    
    @IsOptional()
    category: Category; 

    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in the array
    @Type(() => CreateChapterDto) // Transform the array items into CreateChapterDto
    chapters: CreateChapterDto[]; // Array of chapters

}