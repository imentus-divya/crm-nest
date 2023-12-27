import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Caches } from 'src/middleware/cache.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role_Screen } from 'src/entity/role_screen.entity';
import { Lov } from 'src/entity/lov.entity';
import { Screen_url } from 'src/entity/screen_url.entity';
import { Upload_meta_data } from 'src/entity/upload_data.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role_Screen,Lov,Screen_url,Upload_meta_data])],
  providers: [UserService,Caches],
  controllers: [UserController]
})
export class UserModule {}
