import { Controller, Get, Req, Post, UseGuards, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { get, request } from 'http';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User } from 'src/entity/user.entity';


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

  @Post('new-upload/file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploadedFiles',
      filename: (req, file, callback) => {
        const originalName = file.originalname.replace(/\s/g, ''); // Remove spaces
        // Create a descriptive filename based on your requirements
        const uniqueSuffix = `${Date.now()}`;
        const customFileName = `${uniqueSuffix}-${originalName}`;

        callback(null, customFileName);
      }
    })
  }))
  @HttpCode(HttpStatus.OK)
  async NewFileUpload(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'csv' }),
    ]
  }),
  ) file: Express.Multer.File, @Body() body: any) {
    return this.adminService.NewFileUpload(file, body);
  }

  // manage user
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/admin-manage-user')
  ManageUser(@Req() request: ExpressRequest) {
    return this.adminService.ManageUser();
  }
  // add user
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/add-user')
  AddUser(@Req() request: ExpressRequest) {
    return this.adminService.AddUser();
  }

  // manageRoles
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/admin-manage-roles')
  ManageRoles(@Req() request: ExpressRequest) {
    return this.adminService.ManageRoles();
  }

  // create role
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/create-role')
  CreateRole(@Req() request: ExpressRequest) {
    return this.adminService.CreateRole();
  }

  // save user
@UseGuards(AuthGuard)
@HttpCode(HttpStatus.OK)
@Post('/save-user')
async SaveUser(@Req() request: ExpressRequest): Promise<User[]> {
return this.adminService.SaveUser(request);}


}

