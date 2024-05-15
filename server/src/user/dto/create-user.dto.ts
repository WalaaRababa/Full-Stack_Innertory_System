/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength ,} from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    @MinLength(6)
    password:string;
    @IsNotEmpty()
    role:string
}

