import {
  Controller,
  DefaultValuePipe,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { request } from 'http';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { foreclosure } from 'src/entity/foreclosure';
import { UpdateUserComments } from './dto/update-user.dto';
import { LPcases } from 'src/entity/lp_court_cases';

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

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/foreclosure')
  async getForeclosure(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 1,
    @Query('county', new DefaultValuePipe('Hillsborough'))
    county: string = 'Hillsborough',
  ): Promise<Pagination<foreclosure>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.userService.getForeclosure(options, county);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/LPcases')
  async getLPcases(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 1,
    @Query('county', new DefaultValuePipe('Hillsborough'))
    county: string = 'Hillsborough',
  ): Promise<Pagination<LPcases>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.userService.getLpCases(options, county);
  }

  // update todo
  @Put('foreclosure/:column1/:column2')
  async updatePost(
    @Param('column1') column1: string,
    @Param('column2') column2: string,
    @Body() commentDTO: UpdateUserComments,
  ) {
    console.log(
      '🚀 ~ file: user.controller.ts:64 ~ UserController ~ commentDTO:',
      commentDTO.newComment,
    );
    return this.userService.updateUserComments(column1, column2, [
      commentDTO.newComment,
    ]);
  }
}
