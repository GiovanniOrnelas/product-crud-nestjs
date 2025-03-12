import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";
import { IProductService } from "./product.service.interface";
import { IProductRepository } from "../repository/product.repository.interface";

@Injectable()
export class ProductService implements IProductService {
    constructor(@Inject('IProductRepository') private productRepository: IProductRepository) { }

    async createAsync(productDto: ProductDto): Promise<number> {
        try {
            const response = await this.productRepository.create(productDto);

            if (response.success) return response.return as number
            else throw new BadRequestException({ errorMessage: `ean ${productDto.ean} already exist!` })
        } catch (error) {
            throw error;
        }
    }

    async findAsync(productId: number): Promise<ProductDto> {
        try {
            const response = await this.productRepository.find(productId);

            if (response.success) return response.return as ProductDto
            else throw new BadRequestException({ errorMessage: response.return })
        } catch (error) {
            throw error;
        }
    }

    async updateAsync(productId: number, productDto: UpdateProductDto): Promise<string> {
        try {
            const response = await this.productRepository.update(productId, productDto);

            if (response.success) return response.return as string
            else throw new BadRequestException({ errorMessage: response.return })
        } catch (error) {
            throw error;
        }
    }

    async deleteAsync(productId: number): Promise<void> {
        try {
            const response = await this.productRepository.delete(productId);

            if (!response.success)
                throw new BadRequestException({ errorMessage: response.return })
        } catch (error) {
            throw error;
        }
    }
}