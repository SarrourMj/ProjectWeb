import { IsString, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionAnswerDto } from './create-chapter.dto';

export class UpdateChapterDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in the array
    @Type(() => QuestionAnswerDto) // Transform the array items into QuestionAnswerDto
    @IsOptional()
    questions?: QuestionAnswerDto[]; // Optional array of questions and answers

    @IsNumber()
    @IsOptional()
    score?: number; // Optional score attribute
}