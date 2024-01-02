import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { foreclosure } from 'src/entity/foreclosure';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(foreclosure)
    private foreclosureRepo: Repository<foreclosure>,
  ) {}

  UserDashboard() {
    log('DASHBOARD');
    return `this action returns to the user dashboard`;
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  async ForeClosure(): Promise<foreclosure[]> {
    let res = await this.foreclosureRepo.find();
    console.log(
      '🚀 ~ file: user.service.ts:25 ~ UserService ~ ForeClosure ~ res:',
      res,
    );
    return res;
  }

  //To add comments
  async updateForeclosure(): Promise<string>{
    return "Updated"
  }

  async Paginate(
    options: IPaginationOptions,
    county: string,
  ): Promise<Pagination<foreclosure>> {
    const qb = this.foreclosureRepo.createQueryBuilder('q');
    qb.where('q.county_name = :county', { county });
    return paginate<foreclosure>(qb, options);
  }
}
