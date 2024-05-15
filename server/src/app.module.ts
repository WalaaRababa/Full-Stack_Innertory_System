/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizationGuard } from './auth/authorization.guard';
@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({type: 'mysql',
    host: process.env.Host,
    port: parseInt(process.env.Port),
    username: process.env.DB_Username,
    password: process.env.DB_password,
    database: process.env.DB_database,
    entities:[User,Product],
    synchronize: true,}),
    UserModule,
    JwtModule.register({
      secret:jwtConstants.secret
    }),
  ],
  controllers: [AppController],
  providers: [AppService,AuthGuard,AuthorizationGuard],

})
export class AppModule {}

/*
{
      type: 'mysql',
      host: process.env.Host,
      port: parseInt(process.env.Port),
      username: process.env.DB_Username,
      password: process.env.DB_password,
      database: process.env.DB_database,
      entities: [Product, User],
      synchronize: true,
    }
    
    */
