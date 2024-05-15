/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTransactionDto {
    @IsNumber()   
    @IsNotEmpty()
    productId:number;
    @IsNumber()
    @IsNotEmpty()
    quantity:number;

}
