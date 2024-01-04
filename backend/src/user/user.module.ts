import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { foreclosure } from 'src/entity/foreclosure';
import { Caches } from 'src/middleware/cache.service';
import { Role_Screen } from 'src/entity/role_screen.entity';
import { Lov } from 'src/entity/lov.entity';
import { Screen_url } from 'src/entity/screen_url.entity';
import { Upload_meta_data } from 'src/entity/upload_data.entity';
import { Roles } from 'src/entity/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role_Screen,
      Lov,
      Screen_url,
      Upload_meta_data,
      Roles,
      foreclosure,
    ]),
  ],
  providers: [UserService, Caches],
  controllers: [UserController],
})
export class UserModule {}
