import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role_Screen } from 'src/entity/role_screen.entity';
import { Screen_url } from 'src/entity/screen_url.entity';


@Injectable()
export class Caches{
   private role_url_api: any = {};
   private role_url_ui: any = {};

  constructor(
    @InjectRepository(Role_Screen) private rolescreenRepository: Repository<Role_Screen>,
    @InjectRepository(Screen_url) private screenurlRepository: Repository<Screen_url>,
    
  ) { }
 
  async Caching(): Promise<any> {   
    console.log("In caching function  : ", this.role_url_api);
    if (Object.keys(this.role_url_api || this.role_url_ui).length === 0) {
      console.log("cache is  empty...query will execute");

      try {
        const caching=await this.rolescreenRepository
        .createQueryBuilder('rolescreen')
        .innerJoin('Screen_url', 'screen', 'screen.screen_id = roleScreen.screen_id')
        .select(['screen.url', 'screen.url_type', 'screen.id', 'roleScreen.role_id'])
        .getRawMany();

        // console.log("🚀 ~ file: cache.service.ts:31 ~ Caches ~ Caching ~ caching:", caching)

            this.role_url_api = caching.filter(data => data.screen_url_type === 'backend');
            this.role_url_ui = caching.filter(data => data.screen_url_type === 'frontend')

            // console.log("backend role url present in cache   : ", this.role_url_api)
            // console.log("frontend role url present in cache   : ", this.role_url_ui)

        // console.log("🚀 ~ file: cache.service.ts:30 ~ AuthService ~ Caching ~ caching:", caching)     
        return {
          "role_url_uii": this.role_url_ui,
          "role_url_apii": this.role_url_api
        };
         
        } catch (error) {
        console.log("🚀  cacheUrls ~ error:", error);
        return error;
      }
    } 
    else 
    {
      // console.log("🚀cache filled : ", this.role_url_api);
      return {
        "role_url_uii": this.role_url_ui,
        "role_url_apii": this.role_url_api
      };

    }
  }

}
