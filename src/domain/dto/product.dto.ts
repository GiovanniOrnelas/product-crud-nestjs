import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    ean!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    unit!: string;

    @IsNotEmpty()
    @IsInt()
    stock!: number;
}

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    unit!: string;

    @IsNotEmpty()
    @IsInt()
    stock!: number;
}