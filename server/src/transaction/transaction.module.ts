/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity'
import { Product } from 'src/product/entities/product.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Transaction,Product])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
