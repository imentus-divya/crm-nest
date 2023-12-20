
// import { Injectable, Inject, OnModuleInit, } from '@nestjs/common';
// import { Cache } from 'cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Role_Screen } from 'src/entity/role_screen.entity';
// import { Screen_url } from 'src/entity/screen_url.entity'
// import { Repository } from 'typeorm';

// @Injectable()
// export class Caching implements OnModuleInit {
//     constructor(  @InjectRepository(Role_Screen) private rolescreenRepository: Repository<Role_Screen>,
//      @InjectRepository(Screen_url) private screenurlrRepository: Repository<Screen_url>,
//      @Inject(CACHE_MANAGER) private cache: Cache) { }

//     private role_url_api: any = {};
//     private role_url_ui: any = {};
    

//     async onModuleInit(): Promise<any> {
//         const cachedRoleUrlApi = await this.cache.get('role_url_api');
//         const cachedRoleUrlUi = await this.cache.get('role_url_ui');
//         console.log("🚀 ~  cachedRoleUrlApi:", cachedRoleUrlApi, '🚀 ~  cachedRoleUrlUI : ', cachedRoleUrlUi)


//         if (!cachedRoleUrlApi || !cachedRoleUrlUi) {
//             console.log("Cache is empty... Query will execute.");
//             try {
               
//                     const caching =await this.rolescreenRepository
//                         .createQueryBuilder('roleScreen')
//                         .innerJoin('roleScreen.screenUrls', 'screenUrls')
//                         .select(['roleScreen.role_id', 'screenUrls.url', 'screenUrls.url_type'])
//                         .getMany();
//                     console.log("🚀 ~ file: caching.service.ts:35 ~ Caching ~ onModuleInit ~ caching:", caching)
                
                
                
//                 }
//             catch (e) {
//             console.log("🚀 ~ file: caching.service.ts:46 ~ Caching ~ onModuleInit ~ e:", e)
//             }
//         }

//     }

//     private async fetchData(): Promise < any > {
//     // fetch data from database 
// }
// }