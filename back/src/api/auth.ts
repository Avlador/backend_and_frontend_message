import express, { Request, Response } from "express";
import { hashedPass } from "../utils/hashPass";
import { prisma } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}
const router = express.Router();

// LOGIN 
router.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Введите email и пароль" });
    }

    //^ Ищем пользователя в БД по email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    // ^ Сравниваем пароль с хэшем из базы
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    //! Создаем JWT токен
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET || "super-secret-key", 
      { expiresIn: "24h" } //? Токен будет "жить" 24 часа
    );

    //! Отправляем токен на фронтенд
    return res.status(200).json({ 
      success: true,
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});
// LOGOUT 
router.post("/logout", async (_req, res) => {
  // Implement session/token invalidation as needed
  return res.status(200).json({ success: true });
});


// REGISTER 
router.post(
  "/register",
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Username, email and password are required" });
      }
      const hash = await hashedPass(password);
      const newUser = await prisma.user.create({
        data: { username, email, password: hash },
      });
      return res.status(201).json({ success: true, data: newUser });
    } catch (e: any) {
      if (e.code === "P2002") {
        return res
          .status(400)
          .json({ error: "Username or Email already taken" });
      }
      console.error(e);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);
// CHECK 
router.get("/check", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ success: true, message: "DB is alive" });
  } catch (e: any) {
    console.error("DB check failed:", e);
    return res.status(500).json({ error: "Database connection error" });
  }
});
export default router;



