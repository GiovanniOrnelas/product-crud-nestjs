import { ProductDto } from "../domain/dto/product.dto";

export interface ProductServiceInterface {
    createAsync(productDto : ProductDto): Promise<void>
}