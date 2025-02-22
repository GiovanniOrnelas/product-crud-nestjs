import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductEntity } from './domain/entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services/product.service';
import { BadRequestException } from '@nestjs/common';
import { ProductValidator } from './validators/product.validator';

describe('Controller - Create', () => {
  let productController: ProductController;

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
      controllers: [ProductController],
      providers: [ProductService, ProductRepository, ProductValidator],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  const mockRequest = {
      ean: "122191",
      name: "Teste",
      unit: "KG",
      stock: 1
  }

  it('should return 201, because the product don"t exist', async () => {
    const result = await productController.create(mockRequest);
    expect(result.productId).toEqual(17);
  });

  it('should return BadRequestException, because the product already exist', async () => {
    await expect(productController.create(mockRequest)).rejects.toThrow(BadRequestException)
  })
});

describe('Find', () => {
  let productController: ProductController;

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
      controllers: [ProductController],
      providers: [ProductService, ProductRepository, ProductValidator],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  let mockRequest = "1"

  it('should return 200, because the product exist', async () => {
    const result = await productController.find(mockRequest);
    expect(result?.data).toBeInstanceOf(ProductEntity);
  });

  it('should return BadRequestException, because the product don"t exist', async () => {
    mockRequest = '30'
    await expect(productController.find(mockRequest)).rejects.toThrow(BadRequestException)
  })
});

describe('Update', () => {
  let productController: ProductController;

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
      controllers: [ProductController],
      providers: [ProductService, ProductRepository, ProductValidator],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  const productDto = {
    "name": "Mussarela POLENGHII",
    "unit": "KG",
    "stock": 10
  }

  it('should return 200, because don"t exist this ean in another product', async () => {
    const productId = '30';
    const result = await productController.update(productId, productDto);
    expect(result.data).toBe('product has been updated');
  });

  it('should return BadRequestException, because already exist this ean in another product', async () => {
    const productId = '100';
    await expect(productController.update(productId, productDto)).rejects.toThrow(BadRequestException)
  })
});

describe.only('Delete', () => {
  let productController: ProductController;

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
      controllers: [ProductController],
      providers: [ProductService, ProductRepository, ProductValidator],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  const productId = '30'

  it('should return 204, because this product has been deleted', async () => {
    await expect(productController.delete(productId)).resolves.toBeUndefined();
  });

  it('should return BadRequestException, because this product don"t exist', async () => {
    await expect(productController.delete(productId)).rejects.toThrow(BadRequestException)
  })
});