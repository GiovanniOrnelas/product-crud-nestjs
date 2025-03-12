import { ProductDto, UpdateProductDto } from "../domain/dto/product.dto";
import { RepositoryResponse } from "../domain/dto/repository.dto";

export interface IProductRepository {
    create(productDto: ProductDto): Promise<RepositoryResponse<number>>
    find(productId: number): Promise<RepositoryResponse<ProductDto | string>>
    update(productId: number, productDto: UpdateProductDto): Promise<RepositoryResponse<string>>
    delete(productId: number): Promise<RepositoryResponse<string>>
}