import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma tipos automaticamente
    whitelist: true, // Remove propriedades não especificadas no DTO
    forbidNonWhitelisted: true, // Retorna um erro caso dados não permitidos sejam enviados
  }));
  await app.listen(3000);
}

bootstrap();