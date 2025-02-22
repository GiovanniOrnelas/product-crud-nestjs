import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

  // DTO Validator
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription(
      'Estas APIs permitem gerenciar produtos em um banco de dados PostgreSQL. Incluindo operações de criação, leitura, atualização e remoção de produtos.\n\n' +
      'As APIs seguem os princípios REST e requer autenticação via Basic Token para operações protegidas.',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();