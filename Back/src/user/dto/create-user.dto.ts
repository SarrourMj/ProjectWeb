//import { Column } from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from './../../user/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  image?: string;

  @ValidateNested()
  @Type(() => Role)
  role: Role;

  //removed courses and badges from the user creation dto because they are empty at the creation also the score is 0 by default
}
