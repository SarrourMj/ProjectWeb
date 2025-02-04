import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne,JoinColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
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
        length: 100,
        nullable: true, 
    })
    certificate: string; 
    
    @Column({
        length: 100,
        nullable: true,
    })
    background_image: string;


    @OneToMany(() => Chapter, chapter => chapter.course, {
        cascade: true, // Automatically save/update chapters when the course is saved/updated
        onDelete: 'CASCADE', // Delete chapters when the course is deleted

    })       chapters: Chapter[];

    @Column()
    content: string;
    @Column()
    slug: string;
    @Column({type:'timestamp', default: () =>'CURRENT_TIMESTAMP'})
    createdon: Date;
    @Column({type:'timestamp', default: () =>'CURRENT_TIMESTAMP'})
    modifiedOn: Date;
    @Column()
    mainimageurl: string;


    @ManyToMany(() => User, user => user.courses)
    
    users: User[];

    @ManyToOne(() => Category, category => category.course, { eager: true} )
      @JoinColumn({ name: 'categoryid' })
    
    category: Category;
}