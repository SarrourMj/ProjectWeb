import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chapter } from '../../chapter/entities/chapter.entity';

@Entity('course')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        unique: true,
    })
    title: string;

    @Column({
        length: 100,
        nullable: true, // Optional certificate
    })
    certificate: string; // Can be a URL or a badge name

    @Column({
        length: 50,
    })
    category: string; // Simple string for category

    // Strong aggregation with Chapter (One-to-Many)
    @OneToMany(() => Chapter, chapter => chapter.course, {
        cascade: true, // Automatically save/update chapters when the course is saved/updated
        onDelete: 'CASCADE', // Delete chapters when the course is deleted
    })
    chapters: Chapter[];
}