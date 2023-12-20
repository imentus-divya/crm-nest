// import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Module ,NestModule,MiddlewareConsumer} from '@nestjs/common';
import { UrlAccess } from 'src/middleware/urlAccess.middleware';
import { AuthGuard } from 'src/auth/auth.guard';
import { Caches } from 'src/middleware/cache.service';


@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
