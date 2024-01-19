import {DataSource,DataSourceOptions} from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Lov_type } from 'src/entity/lov_type.entity';
import { Lov } from 'src/entity/lov.entity';
import { Roles } from 'src/entity/roles.entity';
import { Screens } from 'src/entity/screens.entity';
import { Screen_url } from 'src/entity/screen_url.entity';
import { Role_Screen } from 'src/entity/role_screen.entity';
import { Upload_meta_data } from 'src/entity/upload_data.entity';
import { User_fileType } from 'src/entity/user_filetype.entity';
import { Groups } from 'src/entity/groups.entity';
import { foreclosure } from 'src/entity/foreclosure';
import { User_County } from 'src/entity/user_county.entity';
import { LPcases } from 'src/entity/lp_court_cases';
import { Module_Screen } from 'src/entity/module_screen.entity';
export const dataSourceOptions:DataSourceOptions={
    type: 'postgres',
      host: '35.154.90.180',
      port: 5432,
      password: 'imentus123',
      username: 'postgres',
      entities: [
        User,
        Lov_type,
        Lov,
        Roles,
        Screens,
        Screen_url,
        Role_Screen,
        Upload_meta_data,
        foreclosure,
        LPcases,
        User_fileType,
        User_County,
        Groups,
        Module_Screen
      ],
      database: 'crm',
      synchronize: true,
      logging: true,
      migrationsTableName:"crm_Migration_table",
      migrations:['dist/db/migrations/*{.ts,.js}']
}
const datasource=new DataSource(dataSourceOptions);
export default datasource;