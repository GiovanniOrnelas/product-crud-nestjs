import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { Request } from 'express';
import { ProductRepository } from './repository/product.repository';
import { ProductEntity } from './domain/entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services/product.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ProductValidator } from './validators/product.validator';

describe('Create', () => {
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
    body: {
      ean: "1312321542312321312",
      name: "Teste",
      unit: "KG",
      stock: 1
    },
    headers: {
      authorization: process.env.API_AUTHORIZATION,
    },
    get: jest.fn().mockReturnValue(process.env.API_AUTHORIZATION),
  } as unknown as Request;

  it('should return 201', async () => {
    const result = await productController.create(mockRequest, mockRequest.body);
    expect(result.productId).toEqual(13);
  });

  it('should return BadRequestException', async () => {
    await expect(productController.create(mockRequest, mockRequest.body)).rejects.toThrow(BadRequestException)
  })

  it('should return UnauthorizedException', async () => {
    mockRequest.get = jest.fn().mockReturnValue('')
    await expect(productController.create(mockRequest, mockRequest.body)).rejects.toThrow(UnauthorizedException)
  });
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

  const mockRequest = {
    params: {
      productId: "11"
    },
    headers: {
      authorization: process.env.API_AUTHORIZATION,
    },
    get: jest.fn().mockReturnValue(process.env.API_AUTHORIZATION),
  } as unknown as Request;

  it('should return 200', async () => {
    const result = await productController.find(mockRequest);
    expect(result?.data).toBeInstanceOf(ProductEntity);
  });

  it('should return BadRequestException', async () => {
    mockRequest.params.productId = '20'
    await expect(productController.find(mockRequest)).rejects.toThrow(BadRequestException)
  })

  it('should return UnauthorizedException', async () => {
    mockRequest.get = jest.fn().mockReturnValue('')
    await expect(productController.find(mockRequest)).rejects.toThrow(UnauthorizedException)
  });
});