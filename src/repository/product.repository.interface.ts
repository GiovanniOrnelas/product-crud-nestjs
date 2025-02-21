import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";
import { RepositoryResponse } from "../domain/dto/repository.dto";

export interface ProductRepositoryInterface {
    create(productDto: ProductDto): Promise<RepositoryResponse<string | number>>
    find(productId: number): Promise<RepositoryResponse<ProductDto | string>>
    update(productId: number, productDto: UpdateProductDto): Promise<RepositoryResponse<string>>
}