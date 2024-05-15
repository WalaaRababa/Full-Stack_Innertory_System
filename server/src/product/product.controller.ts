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
import { AuthorizationGuard } from 'src/auth/authorization.guard';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard,AuthorizationGuard)
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
  sortDec() {
    return this.productService.findProductSortedByPriceDescending();
  }
  @Post('sortby-price-asc')
  sortAsc() {
    return this.productService.findProductSortedByPriceAscending();
  }
  @Post('by-range-price')
  test (@Body('min', ParseFloatPipe) min: number,
  @Body('max', ParseFloatPipe) max: number,) {
    return this.productService.findByPriceRange(min,max);
  }
   @Post('search-by-name')
search(@Query('title') title:string )
{
return this.productService.searchByProductName(title)
}
@Post('/search')
async searchByProductName(@Query('title') title: string) {
  return this.productService.searchByProductName(title);
}


}
