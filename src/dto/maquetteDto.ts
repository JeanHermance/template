import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class MaquetteDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    contenue: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    enfantId: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    themeId: number;


}