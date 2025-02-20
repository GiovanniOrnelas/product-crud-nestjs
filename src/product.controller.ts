import { Controller, Post, Req, UnauthorizedException, HttpException, HttpStatus, Body, BadRequestException } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductDto } from './domain/dto/product.dto';
import { Request } from 'express';
import { ApiResponse } from './domain/dto/api-response.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Req() request: Request, @Body() body: ProductDto): Promise<ApiResponse> {
    const authorization = request.get('authorization');

    try {
      if (authorization === process.env.API_AUTHORIZATION) {
        if(await this.productService.createAsync(body)) return { description: "success" };
        else throw new BadRequestException({ description: `EAN ${request.body.ean} already exist!` })
      }

      throw new UnauthorizedException({ description: `unauthorized` });
    } catch (error) {
      console.log(error);
      
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) throw error;
      
      throw new HttpException(
        error instanceof Error ? error.message : 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}