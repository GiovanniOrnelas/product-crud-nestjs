import { Inject, Injectable } from "@nestjs/common";
import { ProductDto } from "../domain/dto/product.dto";
import { ProductRepositoryInterface } from "./product.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../domain/entity/product.entity";
import { Repository } from "typeorm";
import { RepositoryResponse } from "../domain/dto/repository.dto";
import { ProductValidator } from "../validators/product.validator";

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
    constructor(
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
        @Inject(ProductValidator) private productValidator: ProductValidator
    ){}

    async create(productDto: ProductDto): Promise<RepositoryResponse<string | number>> {
        try {
            const response: RepositoryResponse<string | number> = {
                return: `EAN ${productDto.ean} already exist!`,
                success: false
            }

            const existingProduct = await this.productValidator.validator(productDto.ean);

            if (existingProduct == null) {
                const product = await this.productRepository.save(productDto);
                response.return = product.id;
                response.success = true;
            }

            return response;
        } catch (error) {
            throw error
        }
    }

    async find(productId: number): Promise<RepositoryResponse<ProductDto | string>> {
        try {
            const response: RepositoryResponse<ProductDto | string> = {
                return: `Id ${productId} don't exist!`,
                success: false
            }

            const product = await this.productValidator.validator(productId);

            if(product !== null){
                response.return = product;
                response.success = true;
            }

            return response
        } catch (error) {
            throw error
        }
    }
}