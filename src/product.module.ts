import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './domain/entity/product.entity';
import { ProductService } from "./services/product.service";
import { ProductValidator } from './validators/product.validator';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.BD_PORT as string),
      username: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_NAME,
      entities: [ProductEntity],
      synchronize: true
    }),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: 'IProductService', useClass: ProductService }, { provide: 'IProductRepository', useClass: ProductRepository }, ProductValidator
  ],
  exports: ['IProductService', 'IProductRepository']
})
export class ProductModule {}