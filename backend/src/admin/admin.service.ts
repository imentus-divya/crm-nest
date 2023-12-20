import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Injectable()
export class AdminService {
  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  AdminDashboard() {
    return `This action returns to admin dashboard`;
  }
  AdminUploadData()
  {
    return `This action returns to admin Upload Data`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} admin`;
  // }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
}
