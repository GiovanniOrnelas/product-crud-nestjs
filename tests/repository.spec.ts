import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../src/domain/entity/product.entity';
import { ProductRepository } from '../src/repository/product.repository';
import * as dotenv from 'dotenv';
import { BadRequestException } from '@nestjs/common';
dotenv.config();

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: parseInt(process.env.BD_PORT as string),
          username: process.env.BD_USER,
          password: process.env.BD_PASSWORD,
          database: process.env.BD_NAME,
          entities: [ProductEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([ProductEntity]),
      ],
      providers: [ProductRepository],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
  });

  const productDto = {
    ean: "1",
    name: "Teste",
    unit: "KG",
    stock: 1
  }

  it('should create a product', async () => {
    const response = await repository.create(productDto);
    expect(response).toBe(true);
  });

  it('should return BadRequestException', async () => {
    await expect(repository.create(productDto)).rejects.toThrow(BadRequestException);
  });
});