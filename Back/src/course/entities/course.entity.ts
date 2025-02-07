import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Chapter } from '../../chapter/entities/chapter.entity';
import { User } from './../../user/entities/user.entity';
import { Certificate } from './../../certificate/entities/certificate.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  title: string;

  @OneToOne(() => Certificate, { cascade: true, nullable: false, eager: true }) 
  @JoinColumn({ name: 'certificate_id' }) // This will store the certificate ID as a foreign key
  certificate: Certificate; // Now this is a proper relation instead of a string

  @Column({
    length: 1000,
    nullable: true,
  })
  background_image: string;

  @OneToMany(() => Chapter, (chapter) => chapter.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  chapters: Chapter[];

  @Column()
  content: string;

  @Column()
  slug: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdon: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedOn: Date;

  @Column({ nullable: true })
  mainimageurl: string;

  @ManyToMany(() => User, (user) => user.courses)
  users: User[];

  @ManyToOne(() => Category, (category) => category.course, { eager: true })
  @JoinColumn({ name: 'categoryid' })
  category: Category;
}
