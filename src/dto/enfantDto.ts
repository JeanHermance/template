import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class EnfantDto{
    @IsString()
    firstName: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    age: number;

    @IsString()
    @IsOptional()
    pin: string;


    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    niveau_id: number;
    
}