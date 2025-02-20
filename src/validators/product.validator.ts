import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../domain/entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductValidator {
    constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) { }

    async validator(id: string | number): Promise<ProductEntity | null> {
        try {
            const product = await this.productRepository.findOne({
                where: [
                    { id: typeof id === 'number' ? id : undefined },
                    { ean: typeof id === 'string' ? id : undefined }
                ]
            });

            return product
        } catch (error) {
            throw error;
        }
    }
}
