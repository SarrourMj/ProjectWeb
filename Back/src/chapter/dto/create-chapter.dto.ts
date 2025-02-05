import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionAnswerDto {
    @IsString()
    @IsNotEmpty()
    question: string;

    @IsString()
    @IsNotEmpty()
    answer: string;
}

export class CreateChapterDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in the array
    @Type(() => QuestionAnswerDto) // Transform the array items into QuestionAnswerDto
    @IsOptional()
    questions?: QuestionAnswerDto[]; // Optional array of questions and answers

    @IsNumber()
    @IsNotEmpty()
    score: number; // Optional score attribute
}