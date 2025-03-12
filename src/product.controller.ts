import { Controller, Post, Body, Get, UseGuards, InternalServerErrorException, Param, Put, Delete, HttpCode, Inject } from '@nestjs/common';
import { ProductDto, UpdateProductDto } from './domain/dto/product.dto';
import { ApiResponse } from './domain/dto/api-response.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IProductService } from './services/product.service.interface';

@ApiTags('product')
@Controller('api/product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(@Inject('IProductService') private readonly productService: IProductService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um produto' })
  async create(@Body() body: ProductDto): Promise<{productId: number}> {
    try {  
      return { productId: await this.productService.createAsync(body) }
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Busca um produto' })
  async find(@Param('productId') productId: string): Promise<ApiResponse<ProductDto>> {
    try {
      return { data: await this.productService.findAsync(parseInt(productId)) }
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }

  @Put(':productId')
  @ApiOperation({ summary: 'Atualiza um produto' })
  async update(@Param('productId') productId: string, @Body() productDto: UpdateProductDto): Promise<ApiResponse<string>> {
    try {
      return { data: await this.productService.updateAsync(parseInt(productId), productDto) }
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }

  @Delete(':productId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deleta um produto' })
  async delete(@Param('productId') productId: string): Promise<void> {
    try {
      await this.productService.deleteAsync(parseInt(productId));
    } catch (error) {
      throw error instanceof Error ? error : new InternalServerErrorException('Internal server error');
    }
  }
}