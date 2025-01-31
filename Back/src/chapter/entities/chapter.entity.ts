import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './../../course/entities/course.entity';

@Entity('chapter')
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    title: string;

    @Column('text') // Long text attribute for content
    content: string;

    @Column('jsonb', { nullable: true }) // JSON column for questions and answers
    questions: { question: string; answer: string }[];

    @Column('int', { nullable: true }) // Score attribute (number)
    score: number;

    // Relationship with Course (Many-to-One)
    @ManyToOne(() => Course, course => course.chapters, {
        onDelete: 'CASCADE', // Delete chapter if the course is deleted
    })
    course: Course;
}