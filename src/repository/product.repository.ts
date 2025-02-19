import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductDto } from "../domain/dto/product.dto";
import { ProductRepositoryInterface } from "./product.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../domain/entity/product.entity";
import { QueryFailedError, Repository } from "typeorm";

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
    constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) { }
    async create(productDto: ProductDto): Promise<boolean> {
        try {
            await this.productRepository.insert(productDto)

            return true;
        } catch (error) {
            if(error instanceof QueryFailedError && error.message.includes("duplicar valor da chave")) 
                throw new BadRequestException(`Product with EAN ${productDto.ean} already exists!`)
            else
                throw error
        }
    }
}