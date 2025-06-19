import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {

    @IsString()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    confirmationPassword: string;


}