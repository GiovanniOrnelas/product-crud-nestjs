import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../src/domain/entity/product.entity';
import { ProductRepository } from '../src/repository/product.repository';
import { ProductValidator } from '../src/validators/product.validator';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Repository - Create', () => {
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
      providers: [ProductRepository, ProductValidator],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
  });

  const productDto = {
    ean: "141253",
    name: "Teste",
    unit: "KG",
    stock: 1
  }

  it('should return true, because the product don"t exist', async () => {
    const response = await repository.create(productDto);
    expect(response.success).toBe(true);
  });

  it('should return false, because the product already exist', async () => {
    const response = await repository.create(productDto);
    expect(response.success).toBe(false);
  });
});

describe('Repository - Find', () => {
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
      providers: [ProductRepository, ProductValidator],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should return true, because this product exist', async () => {
    const productId = 22;
    const response = await repository.find(productId);
    expect(response.success).toBe(true);
  });

  it('should return false, because this product don"t exist', async () => {
    const productId = 30;
    const response = await repository.find(productId);
    expect(response.success).toBe(false);
  });
});

describe.only('Repository - Update', () => {
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
      providers: [ProductRepository, ProductValidator],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
  });

  const productDto = {
    "name": "Mussarela POLENGHII",
    "unit": "KG",
    "stock": 10
  }

  it('should return true, because don"t exist this ean in another product', async () => {
    const productId = 30;
    const response = await repository.update(productId, productDto);
    expect(response.success).toBe(true);
  });

  it('should return false, because already exist this ean in another product', async () => {
    const productId = 100;
    const response = await repository.update(productId, productDto);
    expect(response.success).toBe(false);
  });
});