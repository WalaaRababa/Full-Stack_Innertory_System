/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
   login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.login(email,password);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

}
