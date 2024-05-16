/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.create({
        description: createProductDto.description,
        price: createProductDto.price,
        title: createProductDto.title,
        stockQuantity: createProductDto.stockQuantity
      });
      return this.productRepository.save(product)
  
    } catch (error) {
      console.log(error);
      
  
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const allProduct = await this.productRepository.find();
      if (!allProduct.length) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'no product yet',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return allProduct;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.massage
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Product | null> {
    const oneProduct = await this.productRepository.findOneBy({ id: id });
    return oneProduct;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const existingProduct = await this.productRepository.findOneBy({ id });
    existingProduct.title = updateProductDto.title;
    existingProduct.stockQuantity = updateProductDto.stockQuantity;
    existingProduct.price = updateProductDto.price;
    existingProduct.description = updateProductDto.description;
    const updatedProduct = this.productRepository.save(existingProduct);
    return updatedProduct;
  }

  async remove(id: number) {
    const deletedProduct = await this.productRepository.delete(id);
    return deletedProduct;
  }

  async stockQuantity({
    quantity,
    id,
  }: {
    quantity: number;
    id: number;
  }): Promise<void> {
    const existingProduct = await this.productRepository.findOneBy({ id });
    existingProduct.stockQuantity = -quantity;
    await this.productRepository.save(existingProduct);
  }
  async findProductSortedByPriceDescending(): Promise<Product[] | null> {
    try {
      const ProductSorted = await this.productRepository.find({
        order: {
          price: 'DESC'
        }
      })
      return ProductSorted;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.massage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
      );
    }
  }
  async findProductSortedByPriceAscending(): Promise<Product[]> {
    try {
      const ProductSorted = this.productRepository.find({
        order: {
          price: 'ASC'
        }
      })
      return ProductSorted;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.massage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
      );
    }
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    try {
      const result = await this.productRepository.find({
        where: {
          price: Between(min, max),
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while searching for products by price range',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
      );
    }
  }
  async searchByProductName(title: string) {
    try {
      const products = await this.productRepository
        .createQueryBuilder('product')
        .where('product.title LIKE :title', { title: `%${title}%` })
        .getMany();
      return products;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while searching for products by name.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
