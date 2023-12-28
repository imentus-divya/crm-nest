import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { request } from 'http';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { foreclosure } from 'src/entity/foreclosure';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/dashboard')
  UserDashboard(@Req() request: ExpressRequest) {
    return this.userService.UserDashboard();
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Get('/foreclosure')
  // ForeClosure(@Req() request: ExpressRequest) {
  //   return this.userService.ForeClosure();
  // }

  @Get('/foreclosure')
  async getForeclosure(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<foreclosure>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.userService.Paginate(options);
  }
}
