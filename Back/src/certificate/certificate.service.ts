import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { User } from '../user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Course } from '../course/entities/course.entity';




@Injectable()
export class CertificateService {


  findAll() {
    return `This action returns all certificate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  }


  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }

  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getUserCertificates(userId: number): Promise<Certificate[]> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['certificates'] });
  
    if (!user || !user.certificates || user.certificates.length === 0) {
      throw new NotFoundException('No certificates found for this user');
    }
  
    return user.certificates;
  }
  

  async assignCertificateToUser(userId: number, courseId: number): Promise<void> {
    // Fetch user with certificates
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['certificates'],
    });
  
    // Fetch course with certificate relation
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      relations: ['certificate'],
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (!course || !course.certificate) {
      throw new NotFoundException('Course or associated certificate not found');
    }
  
    const certificate = course.certificate;
  console.log("certificate assigned: ",certificate);
    // Check if user already has this certificate
    if (user.certificates.some(cert => cert.id === certificate.id)) {
      throw new ConflictException('User already has this certificate');
    }
  
    // Add certificate to user
    user.certificates.push(certificate);
  
    // Save user with the new certificate relation
    await this.userRepo.save(user);
  }
}  
