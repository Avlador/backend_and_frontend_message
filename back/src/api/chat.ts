import express, { Response } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { chatService } from "../services/chat.service";

const router = express.Router();

//* Обязательно вешаем проверку токена на все роуты чатов!
router.use(authMiddleware);

// Создать чат (POST /api/chats)
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { targetUserId } = req.body;
    const currentUserId = req.user!.id; // Получаем ID из токена

    const chat = await chatService.createChat(currentUserId, targetUserId);
    res.status(201).json(chat);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

//* Отправить сообщение в конкретный чат (POST /api/chats/:chatId/messages)
router.post("/:chatId/messages", async (req: AuthRequest, res: Response) => {
  try {
    const chatId = parseInt(req.params.chatId as string);
    const { text } = req.body;
    const authorId = req.user!.id;

    if (!text) return res.status(400).json({ error: "Сообщение не может быть пустым" });

    const message = await chatService.sendMessage(chatId, authorId, text);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
});

//* Получить все сообщения чата (GET /api/chats/:chatId/messages)
router.get("/:chatId/messages", async (req: AuthRequest, res: Response) => {
  try {
    const chatId = parseInt(req.params.chatId as string);
    const userId = req.user!.id;

    const messages = await chatService.getMessages(chatId, userId);
    res.json(messages);
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
});

export default router;