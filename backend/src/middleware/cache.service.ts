import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role_Screen } from 'src/entity/role_screen.entity';
import { Screen_url } from 'src/entity/screen_url.entity';
import { Lov } from 'src/entity/lov.entity';
import { Roles } from 'src/entity/roles.entity';
import { Groups } from 'src/entity/groups.entity';
import { Module_Screen } from 'src/entity/module_screen.entity';



@Injectable()
export class Caches {
  private role_url_api: any = {};
  private role_url_ui: any = {};
  private county = {};
  private fileType = {};
  private roles = {};
  private groups = {};
  private module_screen = {};


  constructor(
    @InjectRepository(Role_Screen) private rolescreenRepository: Repository<Role_Screen>,
    @InjectRepository(Screen_url) private screenurlRepository: Repository<Screen_url>,
    @InjectRepository(Lov) private lovRepository: Repository<Lov>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
    @InjectRepository(Groups) private groupsRepository: Repository<Groups>,
    @InjectRepository(Module_Screen) private module_screenRepository: Repository<Module_Screen>,




  ) { }
  // caching role access based on api
  async Caching(): Promise<any> {
    // console.log("In caching function  : ", this.role_url_api);
    if (Object.keys(this.role_url_api || this.role_url_ui).length === 0) {
      // console.log("cache is  empty...query will execute");

      try {
        const caching = await this.rolescreenRepository
          .createQueryBuilder('rolescreen')
          .innerJoin('Screen_url', 'screen', 'screen.screen_id = roleScreen.screen_id')
          .select(['screen.url', 'screen.url_type', 'screen.id', 'roleScreen.role_id'])
          .getRawMany();
        this.role_url_api = caching.filter(data => data.screen_url_type === 'backend');
        this.role_url_ui = caching.filter(data => data.screen_url_type === 'frontend');


        return {
          "role_url_uii": this.role_url_ui,
          "role_url_apii": this.role_url_api
        };

      } catch (error) {
        console.log("🚀  cacheUrls ~ error:", error);
        return error;
      }
    }
    else {
      return {
        "role_url_uii": this.role_url_ui,
        "role_url_apii": this.role_url_api
      };

    }
  }

  // caching dropdown options for county & filetype
  async CachingDropdown(): Promise<any> {
    console.log("In caching DropdownValues function  : ")
    if ((Object.keys(this.county).length === 0) || (Object.keys(this.fileType).length === 0)) {
      console.log("cache is empty...query will execute for county and filetype")
      try {
        const caching_county = await this.lovRepository.find({
          where: {
            type: { id: 3 } // Assuming 'id' is the primary key of the related entity
          },
          relations: ['type'] // Ensure this corresponds to the correct relation in LOV entity
        });

        // Fetching caching_fileType
        const caching_fileType = await this.lovRepository.find({
          where: {
            type: { id: 4 } // Assuming 'id' is the primary key of the related entity
          },
          relations: ['type'] // Ensure this corresponds to the correct relation in LOV entity
        });

        this.county = caching_county;
        this.fileType = caching_fileType;
        // console.log("🚀 ~ file: cache.service.ts:79 ~ Caches ~ CachingDropdown ~ county:", this.county, "and fileType : ", this.fileType)

        return {
          "county": this.county,
          "fileType": this.fileType
        }
      } catch (error) {
        console.log("🚀  error:", error)
        return error;
      }
    }
    else {
      console.log("🚀cache filled ")  // return role_url_api;
      return {
        "county": this.county,
        "fileType": this.fileType
      }
    }

  }

  // caching roles , groups and table to show in dropdown at time of creating user
  async CachingRolesGroups(): Promise<any> {
    console.log("🚀 ~ file: cache.service.ts:114 ~ Caches ~ CachingRoles:")
    if (Object.keys(this.roles).length === 0 || Object.keys(this.groups).length === 0 || Object.keys(this.module_screen).length === 0) {
      console.log("cache is  empty at roles and groups  & module_screen ...query will execute");

      try {
        const cachingRole = await this.rolesRepository.find({
          where: {
            name: Not("Admin"),
          },
        });
        const cachingGroups = await this.groupsRepository.find({
          where: {
            name: Not("Admin")
          },
        });
        const caching_ModuleScreen = await this.module_screenRepository.find({ });
        console.log("🚀 ~ file: cache.service.ts:135  caching_ModuleScreen:", caching_ModuleScreen)

        return {
          "roles_present": cachingRole,
          "groups_present": cachingGroups,
          "module_screen":caching_ModuleScreen
        };

      } catch (error) {
        console.log("🚀  cacheUrls ~ error:", error);
        return error;
      }
    }
    else {
      return {
        "roles_present": this.roles,
        "groups_present": this.groups
      };


    }

  }
}


