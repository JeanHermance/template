import { IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { TypeElementEnum } from "../enums/typeElementEnum";
import { Type } from "class-transformer";

export class ElementDto{
    @IsString()
    nom_element: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    valeur: string;

    @IsEnum(TypeElementEnum)
    type_element: TypeElementEnum;


    @IsNumber()
    @Type(() => Number)
    theme_id: number;
}