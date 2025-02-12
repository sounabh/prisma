# 🚀 Prisma with Docker and PostgreSQL Integration

## 📖 About Prisma

Prisma is an open-source next-generation ORM (Object-Relational Mapping) for Node.js and TypeScript. It helps developers interact with databases in an efficient and type-safe way. Prisma simplifies database operations by providing a rich set of tools for querying and managing data.

### Why Use Prisma?
- **Type Safety**: Prisma generates types automatically based on your database schema, reducing runtime errors
- **Performance**: Prisma has built-in query optimization and caching
- **Developer Experience**: Prisma's tools (like Prisma Client and Prisma Migrate) provide an easy and intuitive interface for developers to work with databases
- **Easy Setup**: Prisma seamlessly integrates with various SQL databases, including PostgreSQL, MySQL, SQLite, and more

## 🔧 Installation & Setup

### 1. Install Prisma CLI

Using npm:
```bash
npm install prisma --save-dev
```

Using yarn:
```bash
yarn add prisma --dev
```

### 2. Initialize Prisma in Your Project

Run the following command to create the necessary Prisma files:
```bash
npx prisma init
```

This will create a `prisma` folder with two files: `schema.prisma` and `.env`.

## 🛠️ Working with Prisma

### 1. Define Your Database Schema

Open `prisma/schema.prisma` and define your data models, which map to your database tables. For example:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### 2. Set Up Your Database Connection

Edit the `.env` file and set the `DATABASE_URL` with your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

## 💻 Running Prisma Commands

### 1. Migrate Database

Once you've defined your models, you can run a migration to update the database schema:

```bash
npx prisma migrate dev --name init
```

This will create the required database tables based on your schema.

### 2. Generate Prisma Client

The Prisma Client is a query builder that provides a type-safe API for your database. To generate it, run:

```bash
npx prisma generate
```

### 3. Running Prisma Studio

Prisma Studio is a visual interface for interacting with your database. To launch it:

```bash
npx prisma studio
```

## 🐳 Docker Integration for PostgreSQL

### 1. Pull PostgreSQL Docker Image

To avoid manually downloading and setting up PostgreSQL, you can use Docker to easily set up a PostgreSQL container:

```bash
docker pull postgres:latest
```

### 2. Create a PostgreSQL Container

Run the following command to create a new PostgreSQL container:

```bash
docker run --name prisma-postgres \
  -e POSTGRES_PASSWORD=your_db_password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=your_db_name \
  -p 5432:5432 \
  -d postgres:latest
```

### 3. Connect Prisma with PostgreSQL in Docker

Update your `.env` file with the connection string pointing to the Docker container:

```bash
DATABASE_URL="postgresql://postgres:your_db_password@localhost:5432/your_db_name?schema=public"
```

### 4. Verify Connection

Run Prisma commands to verify the connection:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 📋 Example Usage of Prisma Client

Here's how to use Prisma Client in your code to query your PostgreSQL database:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })

  console.log(newUser)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## 📦 Docker Commands Recap

Pull PostgreSQL image:
```bash
docker pull postgres:latest
```

Run PostgreSQL container:
```bash
docker run --name prisma-postgres \
  -e POSTGRES_PASSWORD=your_db_password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=your_db_name \
  -p 5432:5432 \
  -d postgres:latest
```

## 🎉 Conclusion

By following this guide, you've successfully set up Prisma with Docker and PostgreSQL for your project! You can now enjoy a type-safe database experience with Prisma Client while easily managing PostgreSQL with Docker.
