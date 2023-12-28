import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { foreclosure } from 'src/entity/foreclosure';

@Module({
  imports: [TypeOrmModule.forFeature([foreclosure])],

  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
