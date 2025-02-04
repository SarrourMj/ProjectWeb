import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { User } from 'src/user/entities/user.entity';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Certificate, User])],
  providers: [CertificateService],
  controllers: [CertificateController],
})
export class CertificateModule {}
