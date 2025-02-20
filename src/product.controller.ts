import { Controller, Post, Req, UnauthorizedException, Body, BadRequestException, InternalServerErrorException, Get } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductDto } from './domain/dto/product.dto';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { ApiResponse } from './domain/dto/api-response.dto';
dotenv.config();

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Req() request: Request, @Body() body: ProductDto): Promise<{productId: number}> {
    const authorization = request.get('authorization');

    try {
      if (authorization === process.env.API_AUTHORIZATION)   
        return { productId: await this.productService.createAsync(body) }

      throw new UnauthorizedException({ errorMessage: `unauthorized` });
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) throw error;  
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Internal server error');
    }
  }

  @Get(':productId')
  async find(@Req() request: Request): Promise<ApiResponse<ProductDto>> {
    const authorization = request.get('authorization');
    const { productId } = request.params;

    try {
      if (authorization === process.env.API_AUTHORIZATION)
        return { data: await this.productService.findAsync(parseInt(productId)) }

      throw new UnauthorizedException({ description: `unauthorized` });
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) throw error;  
      throw new InternalServerErrorException(error instanceof Error ? error.message : 'Internal server error');
    }
  }
}