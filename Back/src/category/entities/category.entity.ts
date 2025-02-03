import {Entity , Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Course } from "src/course/entities/course.entity";

@Entity('categories')
export class Category {
 
    @PrimaryGeneratedColumn()
    id :number

    @Column()
    title:string;

    @OneToMany(() => Course, course => course.category)
    course: Course[];

}

