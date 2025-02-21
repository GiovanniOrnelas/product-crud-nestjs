import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";
import { ProductServiceInterface } from "./product.service.interface";
import { ProductRepository } from "../repository/product.repository";

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(private productRepository: ProductRepository) { }

    async createAsync(productDto: ProductDto): Promise<number> {
        try {
            const response = await this.productRepository.create(productDto);

            if (response.success) return response.return as number
            else throw new BadRequestException({ errorMessage: response.return })
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

            if (response.success) return response.return
            else throw new BadRequestException({ errorMessage: response.return })
        } catch (error) {
            throw error;
        }
    }
}