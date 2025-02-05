import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { User } from 'src/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';




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
    @InjectRepository(Certificate) private certificateRepo: Repository<Certificate>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getUserCertificates(userId: number): Promise<Certificate[]> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['certificates'] });
  
    if (!user || !user.certificates || user.certificates.length === 0) {
      throw new NotFoundException('No certificates found for this user');
    }
  
    return user.certificates;
  }
  

  async assignCertificateToUser(userId: number, certificateId: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['certificates'] });
    const certificate = await this.certificateRepo.findOne({ where: { id: certificateId } });

    if (user && certificate) {
      user.certificates.push(certificate);
      await this.userRepo.save(user);
    }
}}

