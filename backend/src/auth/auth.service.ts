import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Caches } from 'src/middleware/cache.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private readonly cacheService: Caches,
    private jwtService: JwtService
   
  ) { }

  async Login(req: Request): Promise<any> {
    const { username, password } = req.body;
    console.log("🚀 ~ file: auth.service.ts:14 ~ AuthService ~ findAll ~ req:", req.body)
    const user = await this.userRepository.findOne({ where: { username, password }, relations: ['role_id'] })
    const role_id=user.role_id.id;
    console.log("🚀 ~ file: auth.service.ts:21 ~ AuthService ~ findAll ~ user:", user)

    if (user?.password === password) {
      // console.log("🚀 ~ file: auth.service.ts:19 ", user)
      // return [user];
      const payload = { id: user.id, username: user.username ,role_id:user.role_id.id ,company_id:user.company_id,tenant_id:user.tenant_id  };
      return{tokenVal: await this.jwtService.signAsync(payload) , username , role_id}
    }
    console.log('User not found');
    return [];
  }

}
