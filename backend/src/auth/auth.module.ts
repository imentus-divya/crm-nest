import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';
import { Caches } from 'src/middleware/cache.service';
import { Role_Screen } from 'src/entity/role_screen.entity';
import { Screen_url } from 'src/entity/screen_url.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User,Role_Screen,Screen_url]) , JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService,Caches]
})
export class AuthModule {}
