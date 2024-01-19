// create-user.dto.ts

import { IsString, IsEmail, IsObject, IsArray, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserType {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  created_date: string;

  @IsNotEmpty()
  active: boolean;
}

class CountyType {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  // Assuming 'type' is an array of some object type
  @IsObject()
  type: object[];
}

class InputValType {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;
}

export class CreateUserDto {
  @ValidateNested()
  @Type(() => InputValType)
  InputVal: InputValType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CountyType)
  selectedCounty: CountyType[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CountyType)
  selectedFiletype: CountyType[];

  @ValidateNested()
  @Type(() => UserType)
  selectedrole: UserType;

  @IsObject()
  selectedGroup: object;

  @IsInt()
  userID: number;
}
