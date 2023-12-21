import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { request } from 'http';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/dashboard')
  UserDashboard(@Req() request: ExpressRequest) {
    return this.userService.UserDashboard();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/foreclosure')
  UserUplaodData(@Req() request: ExpressRequest) {
    return this.userService.UserUplaodData();
  }
}
