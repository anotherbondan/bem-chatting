const prisma = require("../db/index");

const findMessagesBetweenUsers = async (user1, user2) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    },
  });

  return messages;
};

const createMessage = async (senderId, receiverId, text) => {
  const newMessage = await prisma.message.create({
    data: {
      senderId,
      receiverId,
      text,
    },
  });

  return newMessage;
};

const findLastMessageBetweenUser = async (user1, user2) => {
  const lastMessage = await prisma.message.findFirst({
    where: {
      OR: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    },
    orderBy: { timestamp: "desc" },
  });

  return lastMessage;
};

module.exports = {
  findMessagesBetweenUsers,
  findLastMessageBetweenUser,
  createMessage,
};
