import { ProductDto } from "../domain/dto/product.dto";

export interface ProductRepositoryInterface {
    create(productDto: ProductDto): Promise<boolean>
}