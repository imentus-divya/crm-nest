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
import { User_County } from 'src/entity/user_county.entity';
import { Groups } from 'src/entity/groups.entity';
import { CreateUserDto } from './dto/user-dto';
import { FindOperator } from 'typeorm';


@Injectable()
export class AdminService {
  constructor(
    private readonly cacheService: Caches,
    @InjectRepository(Upload_meta_data)
    private metadataRepository: Repository<Upload_meta_data>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
    @InjectRepository(User_fileType) private filetypeRepository: Repository<User_fileType>,
    @InjectRepository(User_County) private countyRepository: Repository<User_County>,
    @InjectRepository(Groups) private groupsRepository: Repository<Groups>,


  ) { }
  adminDetails = {};

  AdminDashboard = async () => {
    // caching dropdown of county and filetype
    const county_FileType = await this.cacheService.CachingDropdown();
    const role_groups = await this.cacheService.CachingRolesGroups();

    const msg = 'This action returns to  AdminDashboard';
    // console.log(
    //   '🚀 ~ file: admin.service.ts:21 ~ AdminService ~ AdminDashboard=async ~ county_FileType:',
    //   county_FileType,
    // );
    return { county_FileType, role_groups, msg };
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
    // const roles = await this.cacheService.CachingRolesGroups();
    // console.log(
    //   '🚀 ~ file: admin.service.ts:107 ~ AdminService ~ roles:',
    //   roles,
    // );
    // return roles;
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
      const groupPresent = req.body.selectedGroup;
      console.log("🚀 ~ AdminService ~ SaveNewUser ~ groupPresent:", groupPresent)
      const rolePresent = req.body.selectedrole;
      console.log("🚀 ~ AdminService ~ SaveNewUser ~ rolePresent:", rolePresent)

      // fetching role from req
      const user_role = await this.rolesRepository.findOne({ select: ['id'], where: { name: rolePresent.name }, });
      console.log("🚀 ~ AdminService ~ SaveNewUser ~ user_role:", user_role)
      // fetching group from req
      const user_group = await this.groupsRepository.findOne({ select: ['id'], where: { name: groupPresent.name } })
      console.log("🚀 ~ AdminService ~ SaveNewUser ~ user_group:", user_group)


      // try {
      //   const saveUser = await this.userRepository.save(user);
      //   const newUser_id = saveUser.id as number;
      //   console.log(
      //     '🚀 ~ file: admin.service.ts:147 ~ AdminService ~ SaveUser ~ newUser_id:',
      //     newUser_id,
      //     'type is : ',
      //     typeof newUser_id,
      //   );
      //   return newUser_id;
      //   // UpdateUserFileType(newUserId);
      // } catch (e) {
      //   console.log(
      //     '🚀 ~ file: admin.service.ts:146 ~ AdminService ~ SaveUser ~ e:',
      //     e,
      //   );
      // } user_role_id = user_role ? user_role.id : null;
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
      user.role_id = user_role;
      user.group_id = user_group;
      // make country_code dynamic
      user.country_code = 1;
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

      } catch (e) {
        console.log(
          '🚀 ~ file: admin.service.ts:146 ~ AdminService ~ SaveUser ~ e:',
          e,
        );
      }
    }
    const UpdateUserFileType = async (userID: number): Promise<User_fileType> => {
      const userFileType = userData.selectedFiletype;
      console.log("🚀 ~ file: admin.service.ts:163 ~ AdminService ~ userFileType:", userFileType)
      if (!userID) {
        console.log(`User with ID ${userID} not found`);
        return;
      }
      // Fetch file types by their IDs
      const fileTypes_id = userFileType.map((filetypes) => filetypes.id)
      console.log("🚀 ~ file: admin.service.ts:174 ~ AdminService ~ fileTypes_id:", fileTypes_id, "type is :")
      // Create associations between the user and file types
      const userFileTypes = fileTypes_id.map(fileType => {
        const fileType_obj = new User_fileType();
        fileType_obj.user_id = userID;
        console.log("🚀 ~ userID:", fileType_obj.user_id, "--type is-- :", typeof (fileType_obj.user_id))
        fileType_obj.filetype_id = parseInt(fileType);
        console.log("🚀 fileType:", fileType_obj.filetype_id, typeof (fileType_obj.filetype_id))
        console.log("🚀 ~ file: admin.service.ts:187 ~ AdminService ~ userFileTypes ~ fileType_obj:", fileType_obj)
        // Save  to the database
        this.filetypeRepository.save(fileType_obj);
        // return fileType_obj;
      });


      // console.log(`File types associated with user ${userID}`);
    }
    const UpdateUserCounty = async (userID: number): Promise<any> => {
      if (!userID) {
        console.log(`User with ID ${userID} not found`);
        return;
      }
      // Fetch file types by their IDs
      const User_County_id = userData.selectedCounty;

      const county_ids = User_County_id.map((county) => county.id)

      // Create associations between the user and file types
      const userCounty = county_ids.map(county => {
        const County_obj = new User_County()
        County_obj.user_id = userID;
        County_obj.county_id = parseInt(county);
        // Save  to the database
        this.countyRepository.save(County_obj)
        // return fileType_obj;
      });
    }
    SaveNewUser().then(
      (userId) => {
        console.log("New User ID:", userId);
        UpdateUserFileType(userId);
        UpdateUserCounty(userId);
      }

    )
    return []
  }
  EditUser = async (req: Request) => {
    // console.log("🚀 ~ AdminService ~ req:", req.body)
    const user_id_edit = req.body.id;
    console.log("🚀 ~ AdminService ~ EditUser=async ~ user_id_edit:", user_id_edit)
    try {
      const findUser = await this.userRepository.find({ where: { id: user_id_edit } });
      //  console.log("🚀 ~ AdminService ~ EditUser=async ~ findUser:", findUser)

      //  TO FETCH THE DROPDOWN DETAILS ..TO SHOW IN THE DROPDOWN
      // const findUser_County=await this.countyRepository.find({where:{user_id:user_id_edit}, relations: ['county_id','user_id']});
      // console.log("🚀 ~ AdminService ~ EditUser=async ~ findUser_County:", findUser_County)
      // const findUser_fileType=await this.filetypeRepository.find({where:{user_id:user_id_edit}});
      // console.log("🚀 ~ AdminService ~ EditUser=async ~ findUser_fileType:", findUser_fileType)

      return findUser;

    } catch (error) {
      console.log("🚀  cacheUrls ~ error:", error);
      return error;
    }

  }

  UpdateUser = async (createUserDto: CreateUserDto) => {

    console.log("🚀 ~ AdminService ~ createUserDto:", createUserDto)
    console.log("🚀 ~ AdminService ~ UpdateUser=async ~ createUserDto:", createUserDto.InputVal)
    const { userID } = createUserDto;
    const userToUpdate = await this.userRepository.findOne({ where: { id: userID } });

    // If the user is not found, return null or handle accordingly
    if (!userToUpdate) {
      console.log("🚀 ~ USER NOT FOUND:", userToUpdate)
      return 'user Not Found !';
    }
    
    // fetching group
    interface Group {
      id: number;
      name: string;
    }      
    const group=createUserDto.selectedGroup as Group;
    const group_id = group.id;
    const user_group = await this.groupsRepository.findOne({ select: ['id'], where: { id: group_id } })
      console.log("🚀EDIT USER --NEW GROUP_ID : ", user_group)

    // FETCHING ROLE
    const role=createUserDto.selectedrole;
    console.log("🚀 ~ role:", role)
    const role_id = role.id;
    const user_role = await this.rolesRepository.findOne({ select: ['id'], where: { id:role_id  }, });
    console.log("🚀 ~ AdminService ~ UpdateUser= ~ user_role:", user_role)


    // updating user text fields
    userToUpdate.first_name = createUserDto.InputVal.firstname;
    userToUpdate.last_name = createUserDto.InputVal.lastname;
    userToUpdate.email = createUserDto.InputVal.email;
    userToUpdate.password = createUserDto.InputVal.password;
    userToUpdate.username = createUserDto.InputVal.username
    userToUpdate.email = createUserDto.InputVal.username
    userToUpdate.group_id=user_group;
    userToUpdate.role_id=user_role;
    this.userRepository.save(userToUpdate);

    // UPDATING USER COUNTY field
    if (createUserDto.selectedCounty) {
      const countyToUpdate = await this.countyRepository.find({
        where: { user_id: { id: userID } },
      });

      console.log("🚀 ~ AdminService ~ UpdateUser=async ~ countyToUpdate:", countyToUpdate)
      // delete previous rows
      await this.countyRepository.delete({ user_id: { id: userID } });

      // insert new details
      const User_County_id = createUserDto.selectedCounty;
      console.log("🚀 the new county selected for updation : ----------", User_County_id)

      const county_ids = User_County_id.map((county) => county.id)
      console.log("🚀 ~ UpdateUser= ~ county_ids-------333:", county_ids)

      for (const county of county_ids) {
        const County_obj = new User_County();
        County_obj.user_id = userID;
        console.log("🚀 ~ AdminService ~ UpdateUser= ~ user_id:", County_obj.user_id, " TYPE :County_obj.user_id ", typeof (County_obj.user_id), "TYPE :userID type : ", typeof (userID));
        County_obj.county_id = county;
        console.log("🚀 ~ AdminService ~ UpdateUser= ~  County_obj.county_id:", County_obj.county_id);
        // Save to the database
        console.log("🚀 ~ ------------COUNTY OBJECT--------------:", County_obj);

        try {
          const savedCounty = await this.countyRepository.save(County_obj);
          console.log("Saved County:", savedCounty);
        } catch (error) {
          console.error("Error saving County:", error);
        }
      }
    }

    // UPDATING FILE-TYPE FIELD
    if (createUserDto.selectedFiletype) {
      const fileToUpdate = await this.filetypeRepository.find({
        where: { user_id: { id: userID } },
      });
      console.log("🚀 ~ fileToUpdate:", fileToUpdate)

      // delete previous rows
      await this.filetypeRepository.delete({ user_id: { id: userID } });

      // insert new details
      const User_FileType_id = createUserDto.selectedCounty;
      console.log("🚀 ~ AdminService ~ UpdateUser= ~ User_FileType_id:", User_FileType_id)

      const file_type_ids = User_FileType_id.map((file_type) => file_type.id)
      console.log("🚀 ~ AdminService ~ UpdateUser= ~ file_type_ids:", file_type_ids)

      for (const file_type of file_type_ids) {
        const FileType_obj = new User_fileType();
        FileType_obj.user_id = userID;
        console.log("🚀 ~ AdminService ~ UpdateUser= ~ FileType_obj.user_id:", FileType_obj.user_id)
        FileType_obj.filetype_id = file_type;
        console.log("🚀 ~ AdminService ~ UpdateUser= ~  FileType_obj.filetype_id:",  FileType_obj.filetype_id)
        // Save to the database
        console.log("🚀 ~ -----------FILETYPE OBJECT--------------:", FileType_obj);

        try {
          const savedFile_type = await this.filetypeRepository.save(FileType_obj);
          console.log("🚀 ~  savedFile_type:", savedFile_type)
        } catch (error) {
          console.error("Error saving fileTYpe:", error);
        }
      }
    }

    // UPDATING GROUP-FIELD
    if(createUserDto.selectedGroup)
    {
      
      console.log("🚀 ~ AdminService ~ UpdateUser= ~ group_id:", group_id)
      

    }
    return
    }


    }

