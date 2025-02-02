import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './../../course/entities/course.entity';
import { Role } from './role.entity';

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

  @Column({ nullable: true })
  image?: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  // Student-specific properties
  @Column({ nullable: true })
  score?: number;

  @ManyToMany(() => Course, { nullable: true })
  @JoinTable()
  courses?: Course[];

  @Column("simple-array", { default: "", nullable: true })
  badges?: string[];
}
