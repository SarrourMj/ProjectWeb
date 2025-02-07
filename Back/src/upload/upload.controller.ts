// upload.controller.ts
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import * as fs from 'fs';
  import { Express } from 'express';
  
  @Controller('upload')
  export class FileUploadController {
    constructor() {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
      @UploadedFile() file: Express.Multer.File,
      @Body() body: { type: 'mainImage' | 'certificateImage' },
    ) {
      // Validate type
      if (!['mainImage', 'certificateImage'].includes(body.type)) {
        fs.unlinkSync(file.path); // Clean up temp file
        throw new Error('Invalid file type');
      }
  
      // Determine target directory
      const targetDir = body.type === 'mainImage' 
        ? '../Front/src/assets/uploads/course' 
        : '../Front/src/assets/uploads/certificates';
  
      // Create directory if needed
      fs.mkdirSync(targetDir, { recursive: true });
  
      // Move file to final location
      const newPath = `${targetDir}/${file.filename}`;
      fs.renameSync(file.path, newPath);
  
      return { 
        message: 'File uploaded successfully',
        path: newPath 
      };
    }
  }