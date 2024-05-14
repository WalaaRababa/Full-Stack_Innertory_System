/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>) { }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const result = await this.productRepository.save(createProductDto)
      return result
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error.message),
        description: 'Some error description',
      });
    }
  }

  async findAll(): Promise<Product[]> {
    const allProduct = await this.productRepository.find();
    return allProduct;
  }

  async findOne(id: number): Promise<Product | null> {
    const oneProduct = await this.productRepository.findOneBy({ id: id })
    return oneProduct
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const existingProduct = await this.productRepository.findOneBy({ id })
    existingProduct.title = updateProductDto.title;
    existingProduct.stockQuantity = updateProductDto.stockQuantity;
    existingProduct.price = updateProductDto.price;
    existingProduct.description = updateProductDto.description
    const updatedProduct = this.productRepository.save(existingProduct);
    return updatedProduct;
  }

  async remove(id: number) {
    const deletedProduct = await this.productRepository.delete(id)
    return deletedProduct
  }

  async stockQuantity({ quantity, id }: { quantity: number; id: number }): Promise<void> {
    const existingProduct = await this.productRepository.findOneBy({ id })
    existingProduct.stockQuantity = -quantity
    await this.productRepository.save(existingProduct)

  }
  async findProductSortedByPriceDescending(): Promise<Product[]> {
    try {
      const ProductSorted = await this.productRepository.createQueryBuilder('product').orderBy('product.price', 'DESC')
        .getMany()
      return ProductSorted
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error.message),
        description: 'Some error description',
      });
    }
  }
  async findProductSortedByPriceAscending(): Promise<Product[]> {
    const ProductSorted = this.productRepository.createQueryBuilder('product').orderBy('product.price', 'DESC')
      .getMany()
    return ProductSorted
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    try {
      const result = await this.productRepository.find(
        {

          where: {
            price: Between(min, max),

          }
        }
      )
      return result
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error.message),
        description: 'Some error description',
      });
    }
  }
  async searchByProductName(name:string)
  {
try {
  // const products=await this.productRepository.createQueryBuilder
  return "name"
} catch (error) {
  
}
  }
}



