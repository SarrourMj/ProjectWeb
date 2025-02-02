import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Chapter } from '../../chapter/entities/chapter.entity';
import { User } from './../../user/entities/user.entity';

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
        length: 400,
        unique: true,
    })
    Description: string;
    @Column({
        length: 100,
        nullable: true, // Optional certificate
    })
    certificate: string; // Can be a URL or a badge name
    
    @Column({
        length: 100,
        nullable: true, // Optional image
    })
    background_image: string; // Can be a URL 
    @Column({
        length: 50,
    })
    category: string; // Simple string for category

    // Strong aggregation with Chapter (One-to-Many)
    @OneToMany(() => Chapter, chapter => chapter.course, {
        cascade: true, // Automatically save/update chapters when the course is saved/updated
        onDelete: 'CASCADE', // Delete chapters when the course is deleted
    })
    @Column()
    content: string;
    @Column()
    slug: string;
    @Column({type:'timestamp', default: () =>'CURRENT_TIMESTAMP'})
    createdOn: Date;
    @Column({type:'timestamp', default: () =>'CURRENT_TIMESTAMP'})
    modifiedOn: Date;
    @Column()
    mainImageUrl: string;


    chapters: Chapter[];

    @ManyToMany(() => User, user => user.courses)
    users: User[];
}