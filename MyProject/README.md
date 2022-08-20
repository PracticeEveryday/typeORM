# TypeORM CRUD Practices

- TypeORM을 이용한 CURD Example입니다.

## Docker postgreSQL container staring first

- docker pull postgres
- docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgre_password --name postgres-test postgres

## Getting Started

```js
git clone https://github.com/PracticeEveryday/typeORM.git
cd MyProject

// making .env first
SERVER_PORT = 5000
DB_URL = postgresql://postgres:postgre_password@localhost:5432/postgres

yarn install
yarn start
```

## Getting test

```js
yarn test
```

## Test api

- http://localhost:5000
- response: Hello

## Using Stack

- NodeJs
- TypeScript
- PostgreSQL
- Mocha

## Go to http://localhost:5000/swagger becuase to check API
