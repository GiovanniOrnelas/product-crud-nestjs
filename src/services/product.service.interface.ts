import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";

export interface IProductService {
    createAsync(productDto: ProductDto): Promise<number>
    findAsync(productId: number): Promise<ProductDto>
    updateAsync(productId: number, productDto: UpdateProductDto): Promise<string>
    deleteAsync(productId: number): Promise<void>
}