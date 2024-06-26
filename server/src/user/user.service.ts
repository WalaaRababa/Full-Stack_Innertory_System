/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingEmail = await this.userRepository.findOneBy({ email: createUserDto.email })
      if (existingEmail) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: 'email Already Existing',
        }, HttpStatus.BAD_REQUEST, {
        });
      }
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const user = await this.userRepository.create({
        email: createUserDto.email.toLowerCase(),
        password: hashedPassword,
        role: createUserDto.role
      })
      return this.userRepository.save(user)

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while registering employee',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
      });
    }
  }
  async findAll(): Promise<User[]> {
    const allUser = await this.userRepository.find();
    return allUser;
  }

  async login(email: string, password: string): Promise<any> {

    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          message: 'The email does not exist or The password you’ve entered is incorrect',
        }, HttpStatus.NOT_FOUND, {
        });
      }
      else {
        const isValid = await bcrypt.compare(password, user?.password);
        if (!isValid) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'The email does not exist or The password you’ve entered is incorrect',
          }, HttpStatus.NOT_FOUND, {
          });
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };

      }
    } catch (error) {
      throw error
    }
  }

 
}
