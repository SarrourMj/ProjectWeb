import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
 
  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateService.remove(+id);
  }


  @Get('user/:userId')
  getUserCertificates(@Param('userId') userId: number) {
    return this.certificateService.getUserCertificates(userId);
  }

  @Post('assign/:userId/:certificateId')
  assignCertificate(@Param('userId') userId: number, @Param('certificateId') certificateId: number) {
    return this.certificateService.assignCertificateToUser(userId, certificateId);
  }
}
