import { Module ,NestModule,MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './entity/user.entity';
import { Lov_type } from './entity/lov_type.entity';
import { Lov } from './entity/lov.entity';
import { Roles } from './entity/roles.entity';
import { AdminModule } from './admin/admin.module';
import { Screens} from './entity/screens.entity';
import { Screen_url } from './entity/screen_url.entity';
import { Role_Screen } from './entity/role_screen.entity';
import { Upload_meta_data } from './entity/upload_data.entity';
// import { UrlAccess } from './middleware/urlAccess.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { Caches } from './middleware/cache.service';
// import { UrlAccess } from './middleware/urlAccess.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123',
    username: 'postgres',
    entities: [User ,Lov_type ,Lov,Roles ,Screens,Screen_url,Role_Screen,Upload_meta_data],
    database: 'crm_db',
    synchronize: true,
    logging: true,
  }),  
  CacheModule.register({ isGlobal: true }),
  TypeOrmModule.forFeature([Screen_url ,Role_Screen,Lov]),
  AuthModule, 
  AdminModule, UserModule,
  // isGlobal: true will make the cache available to all modules in the
  //  application, meaning you won't need to import the cache module into each module!
  ],
  controllers: [AppController],
  providers: [AppService,Caches],
})
export class AppModule{}
// export class AppModule implements NestModule{
  
//   // middleware configuartion
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(UrlAccess).forRoutes('/admin-dashboard','/upload-data','/dashboard', '/foreclosure')
//   // }
// }
