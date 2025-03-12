import { Inject, Injectable } from "@nestjs/common";
import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";
import { IProductRepository } from "./product.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../domain/entity/product.entity";
import { Repository } from "typeorm";
import { RepositoryResponse } from "../domain/dto/repository.dto";
import { ProductValidator } from "../validators/product.validator";

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,

        @Inject(ProductValidator) private productValidator: ProductValidator
    ){}
    
    async create(productDto: ProductDto): Promise<RepositoryResponse<number>> {
        try {
            const existingProduct = await this.productValidator.validator(productDto.ean);

            if (existingProduct == null) {
                const product = await this.productRepository.save(productDto);
                return { return: product.id, success: true}
            }

            return { success: false };
        } catch (error) {
            throw error
        }
    }

    async find(productId: number): Promise<RepositoryResponse<ProductDto | string>> {
        try {
            const product = await this.productValidator.validator(productId);

            if(product !== null) return { return: product, success: true }

            return { return: `id ${productId} don't exist!`, success: false }
        } catch (error) {
            throw error
        }
    }

    async update(productId: number, productDto: UpdateProductDto): Promise<RepositoryResponse<string>> {
        try {
            const product = await this.productValidator.validator(productId);
            if (!product) return { return: `id ${productId} doesn't exist!`, success: false };

            await this.productRepository.save({
                ...product,
                ...productDto
            });

            return { success: true, return: `product has been updated` };;
        } catch (error) {
            throw error;
        }
    }

    async delete(productId: number): Promise<RepositoryResponse<string>> {
        try {
            const product = await this.productValidator.validator(productId);
            if (!product) return { return: `id ${productId} doesn't exist!`, success: false };

            await this.productRepository.delete(productId)
            
            return { success: true, return: `product has been deleted` };;
        } catch (error) {
            throw error;
        }
    }
}