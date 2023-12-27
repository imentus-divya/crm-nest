import { Injectable, UploadedFile ,} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caches } from 'src/middleware/cache.service';
import { Upload_meta_data } from 'src/entity/upload_data.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Request } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Express } from 'express';



@Injectable()
export class AdminService {
  constructor(private readonly cacheService: Caches,
  @InjectRepository(Upload_meta_data) private metadataRepository: Repository<Upload_meta_data>,
    ) { }


  AdminDashboard = async () => {
    const county_FileType = await this.cacheService.CachingDropdown();
    const msg = 'This action returns to  AdminDashboard';
    console.log("🚀 ~ file: admin.service.ts:21 ~ AdminService ~ AdminDashboard=async ~ county_FileType:", county_FileType)
    return { county_FileType, msg };

  }
  async HistoryUploads() {
    console.log('~~line number 30 ...history uploads',  await this.metadataRepository.find({relations:['upload_type' , 'county']}))
    return await this.metadataRepository.find({relations:['upload_type' , 'county']});
  }
  AdminNewUpload() {
    return `This action returns to admin new upload`;
  }
  async NewFileUpload(file: Express.Multer.File, body: any) {
    if (!file) {
      console.log("🚀 ~ file: admin.service.ts:30 ~ AdminService ~ file:", file)
      // throw new BadRequestException('No file uploaded or incorrect field name');
    }

    const { county, fileType, RowCount } = body;
    console.log("🚀 ~ file: admin.service.ts:40 ~ AdminService ~ county, fileType, RowCount :", county, fileType, RowCount)
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
      console.log("🚀 ~ file: admin.service.ts:73 ~ AdminService ~ NewFileUpload ~ result:", result)
      return result; 
    }
    catch (e) {
      console.log("error present is at query execution of upload file : ", e)
      throw new Error(`Error while inserting upload metadata: ${e}`);
    }

  }


}
