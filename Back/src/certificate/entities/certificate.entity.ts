import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageurl: string; // Certificate image URL

  @Column({ default: '' })
  description: string;
  @OneToOne(()=>Course,course=>course.certificate)
  course: Course;
  @ManyToMany(() => User, (user) => user.certificates)
  users: User[];
}
