import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { foreclosure } from 'src/entity/foreclosure';
import { LPcases } from 'src/entity/lp_court_cases';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(foreclosure)
    private foreclosureRepo: Repository<foreclosure>,
    @InjectRepository(LPcases)
    private lpcasesRepo: Repository<LPcases>,
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

  async getForeclosure(
    options: IPaginationOptions,
    county: string,
  ): Promise<Pagination<foreclosure>> {
    const qb = this.foreclosureRepo.createQueryBuilder('q');
    qb.where('q.county_name = :county', { county });
    return paginate<foreclosure>(qb, options);
  }

  async getLpCases(
    options: IPaginationOptions,
    county: string,
  ): Promise<Pagination<LPcases>> {
    const qb = this.lpcasesRepo.createQueryBuilder('q');
    qb.where('q.county_name = :county', { county });
    return paginate<LPcases>(qb, options);
  }

  // update
  async updateUserComments(
    column1Value: string,
    column2Value: string,
    valuesToAdd: string[],
  ): Promise<void> {
    console.log(
      '🚀 ~ file: user.service.ts:58 ~ UserService ~ valuesToAdd:',
      valuesToAdd,
    );
    // Find the entity using the composite primary key
    const entityToUpdate = await this.foreclosureRepo.findOne({
      where: { case_number: column1Value, internal_case_id: column2Value },
    });
    console.log(
      '🚀 ~ file: user.service.ts:60 ~ UserService ~ entityToUpdate:',
      entityToUpdate,
    );

    // user_comments is an array of strings
    entityToUpdate.user_comments = [
      ...entityToUpdate.user_comments,
      ...valuesToAdd,
    ];
    console.log(
      '🚀 ~ file: user.service.ts:66 ~ UserService ~ entityToUpdate.user_comments:',
      entityToUpdate.user_comments,
    );

    // Save the modified entity
    await this.foreclosureRepo.save(entityToUpdate);
  }
}
