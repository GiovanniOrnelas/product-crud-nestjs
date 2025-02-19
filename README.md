# Product CRUD API - NestJS

Este é um projeto desenvolvido com NestJS para demonstrar um CRUD de produtos utilizando PostgreSQL e Express. Para não criarmos complexidade, utilizei o TypeORM para realizarmos requisições simples no banco sem precisarmos criar linguagens SQL em nosso código. O objetivo é fornecer um exemplo bem estruturado de uma API REST para portfólio e aprendizado.

## 🚧 Status
- Em desenvolvimento

## 🚀 Tecnologias Utilizadas

- Node.js com TypeScript
- NestJS (Arquitetura modular e injeção de dependências)
- PostgreSQL (Banco de dados relacional)
- TypeORM (Facilita a comunicação com o banco de dados de forma orientada a objetos)
- Jest (Testes automatizados)

## 📌 Funcionalidades

- Criar um produto
- Listar todos os produtos
- Buscar um produto por ID
- Atualizar um produto
- Deletar um produto

## 🛠️ Como Rodar

- Clone o repositório: https://github.com/GiovanniOrnelas/product-crud-nestjs.git
- Instale as dependências:
- Configure o banco de dados PostgreSQL em seu ambiente local
- Inicie o servidor: npm run start

## ⚡ Exemplos de Endpoints

- Criar um Produto

    curl 'http://localhost:3000/product' \
    -H 'Authorization: Basic bGlua3RvdTpuZXdQYXNzdzByZA==' \
    -H 'Content-Type: application/json' \
    -d '{
        "ean": "123",
        "name": "Mussarela ITALAC",
        "unit": "KG",
        "stock": 10
    }'

## 🧪 Testes Unitários

- Crie o script no seu package.json

    "scripts": {
        "start": "nest build && node dist/main",
        "test:controller": "jest src/app.controller.spec.ts",
        "test:repository": "jest test/repository.spec.ts"
  }

- Para rodar os testes, execute: npm run <script_name>