import { Controller, Get, Req, Post, UseGuards, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { get } from 'http';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';


// import { CreateAdminDto } from './dto/create-admin.dto';
// import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/admin-dashboard')
  AdminDashboard(@Req() request: ExpressRequest) {
    return this.adminService.AdminDashboard();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/upload-data')
  AdminUploadData(@Req() request: ExpressRequest) {
    return this.adminService.HistoryUploads();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/upload-data/new-upload')
  AdminNewUpload(@Req() request: ExpressRequest) {
    return this.adminService.AdminNewUpload();
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('new-upload/file')
  // NewFileUpload(@Req() request: ExpressRequest) {
  // return this.adminService. NewFileUpload(request);
  
  @Post('new-upload/file')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './uploadedFiles',
      filename: (req, file, callback) => {
        const originalName = file.originalname.replace(/\s/g, ''); // Remove spaces
        const fileExtName = extname(originalName); // Extract file extension

        // Create a descriptive filename based on your requirements
        const uniqueSuffix = `${Date.now()}`;
        const customFileName = `${uniqueSuffix}-${originalName}`;
        
        callback(null, customFileName);
  }})
  }))
  async NewFileUpload(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'csv' }),
    ]
  }),
  ) file: Express.Multer.File, @Body() body: any) {
    return this.adminService.NewFileUpload(file, body);
  }

}
