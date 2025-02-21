import { Controller, Post, Body, Get, UseGuards, InternalServerErrorException, Param, Put } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductDto, UpdateProductDto } from './domain/dto/product.dto';
import { ApiResponse } from './domain/dto/api-response.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: ProductDto): Promise<{productId: number}> {
    try {  
      return { productId: await this.productService.createAsync(body) }
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }

  @Get(':productId')
  async find(@Param('productId') productId: string): Promise<ApiResponse<ProductDto>> {
    try {
      return { data: await this.productService.findAsync(parseInt(productId)) }
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }

  @Put(':productId')
  async update(@Param('productId') productId: string, @Body() productDto: UpdateProductDto): Promise<ApiResponse<string>> {
    try {
      return { data: await this.productService.updateAsync(parseInt(productId), productDto) }
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }
}