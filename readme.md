# Cards Micro Service

ES6 Express server to Add / View & Delete Credit cards from Sqllite DB

## Getting started

### 1. Clone the card-microservice repo and install dependencies

```sh
git clone git@github.com:nitinmaram/card-microservice.git
```

Install npm dependencies:

```sh
cd card-microservice
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This will creates the `Card` table which is defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```sh
npx prisma migrate dev --name init
```

### 3. Start the REST API server

```sh
npm run dev
```

The server is now running on `http://localhost:3000`.

## Using the Swagger UI to access REST API

You can access the Swagger UI of the server using : `http://localhost:3000/api-docs`.

## Postman Collection

Postman collection is placed inside ./public folder

