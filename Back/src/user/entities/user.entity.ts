import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Course } from './../../course/entities/course.entity';
import { Role } from './role.entity';

@Entity('users')//changed 'user' to 'users' to avoid conflict in postgres with the database user : postgres
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

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  // Student-specific properties
  @Column({ nullable: true })
  score?: number;

  @ManyToMany(() => Course, { nullable: true })
  @JoinTable()
  courses?: Course[];

  @Column("simple-array", { default: "", nullable: true })
  badges?: string[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
