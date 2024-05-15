/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class TransactionService {
  constructor(@InjectRepository(Transaction) private transactionRepository:Repository<Transaction>,
  @InjectRepository(Product) 
    private productRepository: Repository<Product>,){}
  async create(createTransactionDto: Partial<Transaction>): Promise<Transaction> {
    try {
      const product = await this.productRepository
      .createQueryBuilder("product")
      .where("product.id = :productId", { productId: createTransactionDto.productId })
      .getOne()
      console.log(product);
      
      if (!product) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Product not found',
        }, HttpStatus.BAD_REQUEST);
      }
      if (product.stockQuantity < createTransactionDto.quantity) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Insufficient stock quantity',
        }, HttpStatus.BAD_REQUEST);
      }
      product.stockQuantity -= createTransactionDto.quantity;
      await this.productRepository.save(product);
      const transaction = await this.transactionRepository.save(createTransactionDto);
      return transaction;
    } catch (error) {
       throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findAll(): Promise<Transaction[]> {
    try {
      const transActions=await this.transactionRepository
      .createQueryBuilder('transaction')
      .innerJoinAndSelect('transaction.productId', 'product')
      .orderBy("transaction.timestamp", "DESC")
      .getMany();
      if(!transActions.length)
        {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'no transaction at this moment ',
          }, HttpStatus.NOT_FOUND, {
          });
        }
      return transActions
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
