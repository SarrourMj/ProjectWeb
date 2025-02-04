import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

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

  @ManyToMany(() => User, (user) => user.certificates)
  users: User[];
}
