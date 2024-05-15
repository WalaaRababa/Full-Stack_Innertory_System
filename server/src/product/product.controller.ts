/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseFloatPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  @Post('sortby-price-dec')
  findProductSortedByPriceDescending() {
    return this.productService.findProductSortedByPriceDescending();
  }
  // @Get('asc')
  // findProductSortedByPriceAscending() {
  //   return this.productService.findProductSortedByPriceAscending();
  // }
  // @Get('by-range-price')
  // getByRangePrice (@Query('min', ParseFloatPipe) min: number,
  // @Query('max', ParseFloatPipe) max: number,) {    
  //   return this.productService.findByPriceRange(max,min)
  // }
  @Post('by-range-price')
  test (@Query('min', ParseFloatPipe) min: number,
  @Query('max', ParseFloatPipe) max: number,) {
    return this.productService.findByPriceRange(min,max);
  }
   @Patch('search-by-name')
search(@Query('title') title:string )
{
return this.productService.searchByProductName(title)
}
   

}
