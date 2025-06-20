import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CategoryEnum } from "../enums/categoryEnum";

export class DevinetteDto {
    @IsString()
    question: string;

    @IsString()
    reponse: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @IsOptional()
    points: number;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    indice: string;

    @IsEnum(CategoryEnum)
    category: CategoryEnum


    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    niveau_id: number;
}

