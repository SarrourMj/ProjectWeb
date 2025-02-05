import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Course } from './../../course/entities/course.entity';
import { Role } from './role.entity';
import { Certificate } from './../../certificate/entities/certificate.entity';
import {Chapter} from './../../chapter/entities/chapter.entity'
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
  @JoinColumn({ name: 'roleid' })
  role: Role;
  @ManyToMany(() => Chapter, { nullable: true })
  @JoinTable({
    name: 'user_chapters_chapter', 
    joinColumn: {
        name: 'userid', 
        referencedColumnName: 'id', 
    },
    inverseJoinColumn: {
        name: 'chapterid', 
        referencedColumnName: 'id', 
    },
  })
  chapters?: Chapter[];
  // Student-specific properties
  @Column({ nullable: true })
  score?: number;

  @ManyToMany(() => Course, { nullable: true })
@JoinTable({
    name: 'user_courses_course', // Custom join table name
    joinColumn: {
        name: 'userid', // Column name for the user ID
        referencedColumnName: 'id', // Primary key of the User entity
    },
    inverseJoinColumn: {
        name: 'courseid', // Column name for the course ID
        referencedColumnName: 'id', // Primary key of the Course entity
    },
})
courses?: Course[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
@ManyToMany(() => Certificate, (certificate) => certificate.users, { nullable: true, onDelete: 'CASCADE' })
@JoinTable({
    name: 'user_certificates_certificate', // Custom join table name
    joinColumn: {
        name: 'userid', // Column name for the user ID
        referencedColumnName: 'id', // Primary key of the User entity
    },
    inverseJoinColumn: {
        name: 'certificateid', // Column name for the certificate ID
        referencedColumnName: 'id', // Primary key of the Certificate entity
    },
})
certificates: Certificate[];
}
