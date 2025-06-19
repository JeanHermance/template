import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { RoleEnum } from "../enums/roleEnum";

export class UserDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    cin: string;

    @IsString()
    @IsOptional()
    contact: string;

    @IsString()
    adresse: string;

    @IsString()
    username: string;

    @IsEnum(RoleEnum)
    @IsOptional()
    role: RoleEnum;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    confirmationPassword: string;


}