import { ProductDto } from "../domain/dto/product.dto";

export interface ProductServiceInterface {
    createAsync(productDto: ProductDto): Promise<string | number>

    findAsync(productId: number): Promise<ProductDto>
}