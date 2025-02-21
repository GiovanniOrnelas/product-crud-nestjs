import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";

export interface ProductServiceInterface {
    createAsync(productDto: ProductDto): Promise<string | number>
    findAsync(productId: number): Promise<ProductDto>
    updateAsync(productId: number, productDto: UpdateProductDto): Promise<string>
}