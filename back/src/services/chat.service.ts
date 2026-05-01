import { prisma } from "../db";

export const chatService = {
  createChat: async (currentUserId: number, targetUserId: number) => {
    return await prisma.chat.create({
      data: {
        members: {
          create: [
            { userId: currentUserId }, 
            { userId: targetUserId }   
          ]
        }
      },
      include: {
        members: true 
      }
    });
  },

  // ^ Отправка сообщений
  sendMessage: async (chatId: number, authorId: number, text: string) => {
    const isMember = await prisma.member.findUnique({
      where: {
        userId_chatId: { userId: authorId, chatId: chatId } 
      }
    });

    if (!isMember) {
      throw new Error("Вы не можете писать в этот чат");
    }

    return await prisma.message.create({
      data: {
        text,
        chatId,
        authorId
      }
    });
  },

  //! Получить историю сообщений чата
  getMessages: async (chatId: number, userId: number) => {
    // ? Имеет ли пользователь доступ к чату
    const isMember = await prisma.member.findUnique({
      where: { userId_chatId: { userId, chatId } }
    });

    if (!isMember) {
      throw new Error("Нет доступа к сообщениям");
    }

    return await prisma.message.findMany({
      where: { chatId },
      orderBy: { createAt: "asc" }, //^ Сортируем по дате 
      include: {
        author: { select: { username: true } } 
      }
    });
  }
};