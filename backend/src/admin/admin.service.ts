import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caches } from 'src/middleware/cache.service';
import { Upload_meta_data } from 'src/entity/upload_data.entity';
import { User } from 'src/entity/user.entity';
import { Roles } from 'src/entity/roles.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Express } from 'express';
import { Lov } from 'src/entity/lov.entity';
import { User_fileType } from 'src/entity/user_filetype.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly cacheService: Caches,
    @InjectRepository(Upload_meta_data)
    private metadataRepository: Repository<Upload_meta_data>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
    @InjectRepository(User_fileType)
    private filetypeRepository: Repository<User_fileType>,
  ) {}
  adminDetails = {};

  AdminDashboard = async () => {
    const county_FileType = await this.cacheService.CachingDropdown();
    const msg = 'This action returns to  AdminDashboard';
    console.log(
      '🚀 ~ file: admin.service.ts:21 ~ AdminService ~ AdminDashboard=async ~ county_FileType:',
      county_FileType,
    );
    return { county_FileType, msg };
  };
  async HistoryUploads() {
    console.log(
      '~~line number 30 ...history uploads',
      await this.metadataRepository.find({
        relations: ['upload_type', 'county'],
      }),
    );
    return await this.metadataRepository.find({
      relations: ['upload_type', 'county'],
    });
  }

  AdminNewUpload() {
    return `This action returns to admin new upload`;
  }
  async NewFileUpload(file: Express.Multer.File, body: any) {
    if (!file) {
      console.log(
        '🚀 ~ file: admin.service.ts:30 ~ AdminService ~ file:',
        file,
      );
      // throw new BadRequestException('No file uploaded or incorrect field name');
    }

    const { county, fileType, RowCount } = body;
    console.log(
      '🚀 ~ file: admin.service.ts:40 ~ AdminService ~ county, fileType, RowCount :',
      county,
      fileType,
      RowCount,
    );
    const filename = file.originalname;

    const actualCounty = JSON.parse(county);
    const actualFileType = JSON.parse(fileType);
    const actualRowCount = JSON.parse(RowCount);

    const originalName = file.originalname.replace(/\s/g, ''); // Remove spaces
    // Create a descriptive filename based on your requirements
    const uniqueSuffix = `${Date.now()}`;
    const customFileName = `${uniqueSuffix}-${originalName}`;

    //
    const upload_type = actualFileType.name;
    const upload_county = actualCounty.name;
    const upload_date = new Date();
    const upload_path = `uploadedFiles/${customFileName}`;

    // inserting values in upload_meta_data table
    const meta_data = new Upload_meta_data();
    meta_data.date = new Date();
    meta_data.filename = customFileName;
    meta_data.record_count = actualRowCount;
    meta_data.view_data = upload_path;
    meta_data.county = upload_county;
    meta_data.upload_type = upload_type;

    try {
      const result = await this.metadataRepository.save(meta_data);
      console.log(
        '🚀 ~ file: admin.service.ts:73 ~ AdminService ~ NewFileUpload ~ result:',
        result,
      );
      return result;
    } catch (e) {
      console.log('error present is at query execution of upload file : ', e);
      throw new Error(`Error while inserting upload metadata: ${e}`);
    }
  }
  ManageUser = async () => {
    console.log('🚀 ~ file: admin.service.ts:91 ~ AdminService ~ ManageUser:');
    // const users=await this.userRepository.find({relations:['role_id']});
    const users = await this.userRepository.find({
      where: {
        id: 1,
      },
      relations: ['role_id'],
    });

    console.log(
      '🚀 ~ file: admin.service.ts:90 ~ AdminService ~ users:',
      users,
    );
    // return(users);
    return await this.userRepository.find({ relations: ['role_id'] });
  };
  AddUser = async () => {
    console.log('🚀 ~ file: admin.service.ts:101 ~ AdminService ~ AddUser:');
    const roles = await this.cacheService.CachingRoles();
    console.log(
      '🚀 ~ file: admin.service.ts:107 ~ AdminService ~ roles:',
      roles,
    );
    return roles;
  };
  ManageRoles = async () => {
    console.log(
      '🚀 ~ file: admin.service.ts:105 ~ AdminService ~ ManageRoles:',
    );
    const roles = await this.rolesRepository.find();

    console.log(
      '🚀 ~ file: admin.service.ts:90 ~ AdminService ~ users:',
      roles,
    );
    // return(users);
    return await this.rolesRepository.find();
  };
  CreateRole = async () => {
    console.log('🚀 ~ file: admin.service.ts:119 ~ AdminService ~ CreateRole:');
  };
  async SaveUser(req: Request): Promise<any> {
    const userData = req.body;
    // Insert New User
    const SaveNewUser = async (): Promise<number> => {
      const user_role = await this.rolesRepository.findOne({
        select: ['id'],
        where: { name: 'User' },
      });
      const user_role_id = user_role ? user_role.id : null;
      const inputs = req.body.InputVal;
      const user = new User();
      // Filling User Details
      user.first_name = inputs.firstname;
      user.last_name = inputs.lastname;
      user.email = inputs.email;
      user.password = inputs.password;
      user.username = inputs.username;
      user.tenant_id = 123;
      user.company_id = 456;
      user.created_date = new Date();
      user.active = true;
      user.role_id = user_role_id;
      // make country_code dynamic
      user.country_code = 1;
      console.log(
        '🚀 ~ file: admin.service.ts:145 ~ AdminService ~ SaveUser ~ user:',
        user.role_id,
        '---------type-----',
        typeof user.role_id,
      );
      try {
        const saveUser = await this.userRepository.save(user);
        const newUser_id = saveUser.id as number;
        console.log(
          '🚀 ~ file: admin.service.ts:147 ~ AdminService ~ SaveUser ~ newUser_id:',
          newUser_id,
          'type is : ',
          typeof newUser_id,
        );
        return newUser_id;
        // UpdateUserFileType(newUserId);
      } catch (e) {
        console.log(
          '🚀 ~ file: admin.service.ts:146 ~ AdminService ~ SaveUser ~ e:',
          e,
        );
      }
    };
    const UpdateUserFileType = async (userID: number): Promise<any> => {
      const userFileType = userData.selectedFiletype;
      console.log(
        '🚀 ~ file: admin.service.ts:163 ~ AdminService ~ userFileType:',
        userFileType,
      );
      if (!userID) {
        console.log(`User with ID ${userID} not found`);
        return;
      }

      // Fetch file types by their IDs
      const fileTypes_id = userFileType.map((filetypes) => filetypes.id);
      console.log(
        '🚀 ~ file: admin.service.ts:174 ~ AdminService ~ fileTypes_id:',
        fileTypes_id,
        'type is :',
      );

      // Create associations between the user and file types
      const fileType_obj = new User_fileType();

      const userFileTypes = fileTypes_id.map((fileType) => {
        fileType_obj.user_id = userID;
        console.log(
          '🚀 ~  userFileTypes ~ userID:',
          userID,
          '--type is-- :',
          typeof userID,
        );
        fileType_obj.filetype_id = parseInt(fileType);
        console.log(
          '🚀 userFileTypes ~ parseInt(fileType):',
          parseInt(fileType),
        );

        return userFileType;
      });
      console.log(
        '🚀 ~ file: admin.service.ts:184 ~ AdminService ~ userFileTypes ~ userFileTypes:',
        userFileTypes,
      );

      // Save the associations to the database
      // await this.filetypeRepository.save(userFileTypes);

      // console.log(`File types associated with user ${userID}`);
    };

    SaveNewUser().then((userId) => {
      console.log('New User ID:', userId);
      UpdateUserFileType(userId);
    });

    return [];
  }
}
