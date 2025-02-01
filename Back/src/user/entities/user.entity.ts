import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './../../course/entities/course.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  score: number;

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];

  @Column("simple-array", { default: "" })
  badges: string[];
}
