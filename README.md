# 🚀 Prisma with Docker and PostgreSQL Integration

## 📖 About Prisma

Prisma is an open-source next-generation ORM (Object-Relational Mapping) for Node.js and TypeScript. It helps developers interact with databases in an efficient and type-safe way. Prisma simplifies database operations by providing a rich set of tools for querying and managing data.

### 💡 Why Use Prisma?
- **🔒 Type Safety**: Prisma generates types automatically based on your database schema, reducing runtime errors
- **⚡ Performance**: Prisma has built-in query optimization and caching
- **✨ Developer Experience**: Prisma's tools (like Prisma Client and Prisma Migrate) provide an easy and intuitive interface for developers to work with databases
- **🎯 Easy Setup**: Prisma seamlessly integrates with various SQL databases, including PostgreSQL, MySQL, SQLite, and more

## 🔧 Installation & Setup

> 📌 **Version Compatibility**: This guide is compatible with Prisma 4.x and 5.x (Released 2022-2024)

### 1. 📥 Install Prisma CLI

Using npm:
```bash
npm install prisma --save-dev
```

Using yarn:
```bash
yarn add prisma --dev
```

Using pnpm:
```bash
pnpm add -D prisma
```

### 2. 🎬 Initialize Prisma in Your Project

Run the following command to create the necessary Prisma files:
```bash
npx prisma init
```

This will create a `prisma` folder with two files: `schema.prisma` and `.env`.

## 🛠️ Working with Prisma

### 1. 📝 Define Your Database Schema

Open `prisma/schema.prisma` and define your data models, which map to your database tables. For example:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. 🔗 Set Up Your Database Connection

Edit the `.env` file and set the `DATABASE_URL` with your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

## 💻 Running Prisma Commands

### 1. 🚀 Migrate Database

Once you've defined your models, you can run a migration to update the database schema:

```bash
npx prisma migrate dev --name init
```

This will create the required database tables based on your schema.

### 2. 🔨 Generate Prisma Client

The Prisma Client is a query builder that provides a type-safe API for your database. To generate it, run:

```bash
npx prisma generate
```

### 3. 🎨 Running Prisma Studio

Prisma Studio is a visual interface for interacting with your database. To launch it:

```bash
npx prisma studio
```

Access it at: `http://localhost:5555` 🌐

## 🐳 Docker Integration for PostgreSQL

> 🐘 **PostgreSQL Version**: This guide uses PostgreSQL 15.x+ (Latest stable)

### 1. 📦 Pull PostgreSQL Docker Image

To avoid manually downloading and setting up PostgreSQL, you can use Docker to easily set up a PostgreSQL container:

```bash
docker pull postgres:15-alpine
```

### 2. 🏃 Create a PostgreSQL Container

Run the following command to create a new PostgreSQL container:

```bash
docker run --name prisma-postgres \
  -e POSTGRES_PASSWORD=your_db_password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=your_db_name \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### 3. 🔌 Connect Prisma with PostgreSQL in Docker

Update your `.env` file with the connection string pointing to the Docker container:

```bash
DATABASE_URL="postgresql://postgres:your_db_password@localhost:5432/your_db_name?schema=public"
```

### 4. ✅ Verify Connection

Run Prisma commands to verify the connection:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🐳 Docker Compose Setup (Recommended)

Create a `docker-compose.yml` file for easier management:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: prisma-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_db_password
      POSTGRES_DB: your_db_name
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## 📋 Example Usage of Prisma Client

Here's how to use Prisma Client in your code to query your PostgreSQL database:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ➕ Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })
  console.log('✅ Created user:', newUser)

  // 📖 Find all users
  const allUsers = await prisma.user.findMany()
  console.log('👥 All users:', allUsers)

  // 🔍 Find a specific user
  const user = await prisma.user.findUnique({
    where: { email: 'john.doe@example.com' }
  })
  console.log('🔍 Found user:', user)

  // ✏️ Update a user
  const updatedUser = await prisma.user.update({
    where: { email: 'john.doe@example.com' },
    data: { name: 'John Updated' }
  })
  console.log('✏️ Updated user:', updatedUser)

  // 🗑️ Delete a user
  const deletedUser = await prisma.user.delete({
    where: { email: 'john.doe@example.com' }
  })
  console.log('🗑️ Deleted user:', deletedUser)
}

main()
  .catch(e => {
    console.error('❌ Error:', e)
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## 📦 Docker Commands Recap

Pull PostgreSQL image:
```bash
docker pull postgres:15-alpine
```

Run PostgreSQL container:
```bash
docker run --name prisma-postgres \
  -e POSTGRES_PASSWORD=your_db_password \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=your_db_name \
  -p 5432:5432 \
  -d postgres:15-alpine
```

Stop container:
```bash
docker stop prisma-postgres
```

Start container:
```bash
docker start prisma-postgres
```

Remove container:
```bash
docker rm prisma-postgres
```

View logs:
```bash
docker logs prisma-postgres
```

## 🎯 Useful Prisma Commands

| Command | Description | Emoji |
|---------|-------------|-------|
| `npx prisma init` | Initialize Prisma | 🎬 |
| `npx prisma generate` | Generate Prisma Client | 🔨 |
| `npx prisma migrate dev` | Create migration in development | 🚀 |
| `npx prisma migrate deploy` | Apply migrations in production | 📦 |
| `npx prisma studio` | Open Prisma Studio | 🎨 |
| `npx prisma db push` | Push schema changes to database | ⬆️ |
| `npx prisma db pull` | Pull schema from database | ⬇️ |
| `npx prisma format` | Format Prisma schema | ✨ |
| `npx prisma validate` | Validate Prisma schema | ✅ |

## 🎉 Conclusion

By following this guide, you've successfully set up Prisma with Docker and PostgreSQL for your project! You can now enjoy a type-safe database experience with Prisma Client while easily managing PostgreSQL with Docker. 

Happy coding! 🚀💻

---

<div align="center">

### 👨‍💻 Created by **Sounabho**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sounabh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sounabho)

**Made with ❤️ and ☕**

</div>
