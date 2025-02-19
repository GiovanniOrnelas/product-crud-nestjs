import { Injectable } from "@nestjs/common";
import { ProductDto } from "../domain/dto/product.dto";
import { ProductRepositoryInterface } from "./product.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../domain/entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
    constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) { }
    async create(productDto: ProductDto): Promise<boolean> {
        try {
            const product = await this.productRepository.find({ 
                where: { 
                    ean: productDto.ean
                }
            })
            
            if(product.length == 0){
                await this.productRepository.insert(productDto);
                return true;
            }

            return false;
        } catch (error) {
            throw error
        }
    }
}