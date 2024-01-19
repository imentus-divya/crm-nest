import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request, response } from 'express';
import { Caches } from 'src/middleware/cache.service';
@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
  private readonly cacheService: Caches) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Token extraction
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

      // CHECK URL FUNCTION
      // console.log("🚀 ~ file: auth.guard.ts:39 ------------ payload:",request.user)

    try {
      //  expecting an array of any type for role_url_apii.
      const { role_url_apii } = await this.cacheService.Caching();
      console.log("🚀 ~ file: auth.guard.ts:49 ~ AuthGuard role_url_apii:", role_url_apii)

      const req_role_id = request.user.role_id;
      console.log("🚀 ~ AuthGuard ~ req_role_id:", req_role_id)
      const req_api = request.path;
      console.log("🚀 ~ file: auth.guard.ts:50 ~ AuthGuard ~ req_api:", req_api)
      
      let checkApi = false; // Initialize checkApi as false
      

      role_url_apii.some((data) => {
        if (data.role_id == req_role_id && data.screen_url == req_api) {
          console.log("data.role_id : ",data.role_id ,"data.screen_url : ",data.screen_url)
          checkApi = true; // Set checkApi to true if the conditions match
        }
      });

      if (checkApi) {
        console.log("access granted")
        // next()
      }
      else {
        console.log("access denied")
        // return response.status(401).json({ message: 'Not Accessible url' });
      }

    } catch (error: unknown) {
      // Handle errors if caching fails
      console.error("Error while caching: ", error);
      if (error instanceof Error) {
        // If 'error' is an instance of Error type
        // res.status(500).json({ message: 'Error', error: error.message });
      } else {
        // If 'error' is of a different type (string, etc.)
        // res.status(500).json({ message: 'Error', error: String(error) });
      }
    }

    } catch (e) {
      console.log("🚀 ~ file: auth.guard.ts:38 ~ canActivate ~ UnauthorizedException:", e)
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}