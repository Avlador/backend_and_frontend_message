import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Нет токена авторизации" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Неверный формат токена" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key") as { id: number };
    
    //? Сохраняем id пользователя в объект запроса
    req.user = decoded;
    
    //^ Пропускаем запрос дальше к контроллеру
    next();
  } catch (e) {
    res.status(403).json({ error: "Токен недействителен или истёк" });
  }
};