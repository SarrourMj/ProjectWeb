import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { User } from 'src/user/entities/user.entity';




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
    return user ? user.certificates : [];
  }

  async assignCertificateToUser(userId: number, certificateId: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['certificates'] });
    const certificate = await this.certificateRepo.findOne({ where: { id: certificateId } });

    if (user && certificate) {
      user.certificates.push(certificate);
      await this.userRepo.save(user);
    }
}}

