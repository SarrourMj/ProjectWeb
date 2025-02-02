import { Course } from './../../course/entities/course.entity';
export declare class Chapter {
    id: number;
    title: string;
    content: string;
    questions: {
        question: string;
        answer: string;
    }[];
    score: number;
    course: Course;
}
