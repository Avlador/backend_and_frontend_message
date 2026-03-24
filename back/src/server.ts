// import express, { Request, Response } from "express";
//  import cors from "cors"
// // import { pool, createTable } from "./db";

// const app = express();

// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.json({ status: "ok" });
// });

// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   createTable()
// });




// import express, { Request, Response } from "express";
// import cors from "cors";
// import prisma from "./db"; // Импортируем наш настроенный клиент

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.json({ status: "ok" });
// });

// // Пример: получение всех пользователей через Prisma
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Ошибка БД" });
//   }
// });

// const PORT = 3000;

// // Нам больше не нужно вызывать createTable() вручную!
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



import express, { type Request, type Response } from "express";
import cors from "cors";
// import { pool } from "./db";

import authRouter from "./api/auth";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok!!!!!!" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
