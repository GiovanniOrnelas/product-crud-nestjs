import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: 'Código de barras do produto (EAN)', example: '7891234567890' })
  @IsNotEmpty()
  @IsString()
  ean!: string;

  @ApiProperty({ description: 'Nome do produto', example: 'Coca-Cola 2L' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Unidade de medida do produto', example: 'Litro' })
  @IsNotEmpty()
  @IsString()
  unit!: string;

  @ApiProperty({ description: 'Quantidade em estoque', example: 100 })
  @IsNotEmpty()
  @IsInt()
  stock!: number;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Nome atualizado do produto', example: 'Pepsi 2L' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Unidade de medida do produto', example: 'Litro' })
  @IsNotEmpty()
  @IsString()
  unit!: string;

  @ApiProperty({ description: 'Quantidade em estoque', example: 150 })
  @IsNotEmpty()
  @IsInt()
  stock!: number;
}