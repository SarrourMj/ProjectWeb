import { Controller, Get, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from '../auth/assets/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
@UseGuards(JwtAuthGuard)
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


  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateService.remove(+id);
  }


  @Get('user/:userId')
  getUserCertificates(@Param('userId') userId: number) {
    return this.certificateService.getUserCertificates(userId);
  }

  
  @Post('assign/:userId/:courseId')
  assignCertificate(@Param('userId') userId: number, @Param('courseId') courseId: number) {
    return this.certificateService.assignCertificateToUser(userId, courseId);
  }
}
