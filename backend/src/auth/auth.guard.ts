import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request, Response, NextFunction } from 'express';
@Injectable()

export class AuthGuard implements CanActivate
{
constructor(private jwtService:JwtService){}

async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    const token = request.headers['authorization'];
    console.log("🚀 ~  auth.guard.ts:19  --------- token:", token)
    if (!token) {
      console.log("🚀 TOKEN NOT  PRESENT -----", token)
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log("🚀 TOKEN PRESENT", token)
      request['user'] = payload;
      console.log("🚀 ~ file: auth.guard.ts:38 ~ canActivate ~ payload:", payload)
      
    } catch {
        console.log("🚀 ~ file: auth.guard.ts:38 ~ canActivate ~ UnauthorizedException:", UnauthorizedException)
      throw new UnauthorizedException();
    }
      
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}