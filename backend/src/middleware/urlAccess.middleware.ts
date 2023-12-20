import { Injectable, NestMiddleware } from '@nestjs/common';
import { Caches } from './cache.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UrlAccess implements NestMiddleware {
  constructor(private readonly cacheService: Caches) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // const req_role_id=req.query.role;
    const re_api = req.baseUrl;
    console.log("🚀 ~ file: urlAccess.middleware.ts:12 ~ UrlAccess ~ use ~ re_api:", re_api)


    try {
      //  expecting an array of any type for role_url_apii.
      const { role_url_apii } = await this.cacheService.Caching();
      console.log("Cached data recieved: ", role_url_apii);
      const req_role_id = Number(req.query.role);
      const req_api = req.baseUrl;

      //  const checkApi: boolean = role_url_apii.some((data) => {  
      //  return data.role_id === req_role_id && data.screen_url === req_api
      //  })
      //   console.log("🚀 ~ file: urlAccess.middleware.ts:24 ~ UrlAccess ~ use ~ checkApi:", checkApi)
      let checkApi = false; // Initialize checkApi as false

      role_url_apii.some((data) => {
        if (data.role_id === req_role_id && data.screen_url === req_api) {
          checkApi = true; // Set checkApi to true if the conditions match
         // Stop the iteration once a match is found
        }
         // Continue checking other elements in the array
      });

      if (checkApi) {
        console.log("access granted")
        // next()
      }
      else {
        console.log("access denied")
        return res.status(401).json({ message: 'Not Accessible url' });
      }

    } catch (error: unknown) {
      // Handle errors if caching fails
      console.error("Error while caching: ", error);
      if (error instanceof Error) {
        // If 'error' is an instance of Error type
        res.status(500).json({ message: 'Error', error: error.message });
      } else {
        // If 'error' is of a different type (string, etc.)
        res.status(500).json({ message: 'Error', error: String(error) });
      }
    }
    // const cached_api_data=  await this.cacheService.Caching();
    // console.log("🚀 ~ file: urlAccess.middleware.ts:49 ~ UrlAccess ~ use ~ cached_api_data:", cached_api_data)
    console.log("🚀 ~ file: caching.middleware.ts:8 ~ Caching ~ ~~~~~~~~~~~~~~~~~~~~~~~")
    next();
  }
}
