/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title:string;
    description:string;
    @IsNumber()
    @IsNotEmpty()
    price:number;
    @IsNumber()
    @IsNotEmpty()
    stockQuantity:number
}
