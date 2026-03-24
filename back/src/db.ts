
// import {Pool} from "pg";
// // import prismaConfig from "../prisma.config";
// const pool = new Pool ({
// user: "postgres",
// host:"localhost",
// database:"test_bek_server",
// password:"artemT29",
// port:5433
// });

// const createTable = async () =>{
//     const queryCommand =
//   `  CREATE TABLE IF NOT EXISTS users (
//       id SERIAL PRIMARY KEY,
//       username VARCHAR(50) UNIQUE NOT NULL,
//       email VARCHAR(100) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );`;
//     try{
//         await pool.query(queryCommand);
//         console.log("user_table_create");
//     }
//     catch (e){
//         console.log("error");
//     }
// };

// export {pool, createTable};
// import { PrismaClient } from "./generated/prisma/client";
// const prisma = new PrismaClient()
// export default prisma



// import { Pool } from "pg";
// import { PrismaClient } from "@prisma/client";
// const globalForPrisma = global as unknown as {prisma: PrismaClient};

// const prisma =
// globalForPrisma.prisma ||
// new PrismaClient({log: ['query']});

// if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// // Оставляем pool только если он ОЧЕНЬ нужен для специфических SQL запросов
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "shit_test",
//   password: "artemT29",
//   port: 5433,
//   max:10// Убедитесь, что ваш Postgres реально на 5433, а не 5432!
// });

// // const prisma = new PrismaClient();

// // Эту функцию createTable лучше вообще удалить и сделать npx prisma migrate dev
// export { pool, prisma}; 
// export default prisma;

// import { PrismaClient } from "./generated/prisma/client";

// const prisma = new PrismaClient();


// export default prisma;


import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma"; // Проверьте путь до папки!
import dotenv from 'dotenv'
dotenv.config()
const connectionString = process.env.DATABASE_URL;

// 1. Создаем пул соединений через библиотеку 'pg'
const pool = new Pool({ connectionString });

// 2. Передаем ЭТОТ пул в адаптер
const adapter = new PrismaPg(pool);

// 3. Передаем адаптер в клиент
export const prisma = new PrismaClient({ adapter });