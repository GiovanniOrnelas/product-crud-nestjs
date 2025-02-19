import { Injectable } from "@nestjs/common";
import { ProductDto } from "../domain/dto/product.dto";
import { ProductServiceInterface } from "./product.service.interface";
import { ProductRepository } from "../repository/product.repository";

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(private productRepository: ProductRepository) { }

    async createAsync(productDto: ProductDto): Promise<void> {
        try {
            await this.productRepository.create(productDto);
        } catch (error) {
            throw error;
        }
    }
}