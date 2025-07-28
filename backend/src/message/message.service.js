const {
  findMessagesBetweenUsers,
  createMessage,
} = require("./message.repository");

const getMessagesBetweenUsers = async (user1, user2) => {
  const messages = await findMessagesBetweenUsers(user1, user2);

  if (!messages) {
    throw Error("Messages not found");
  }

  const formattedMessages = messages.map((msg) => ({
    ...msg,
    formattedTime: new Date(msg.timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return formattedMessages;
};

const createNewMessage = async (senderId, receiverId, text) => {
  const message = await createMessage(senderId, receiverId, text);

  if (!message) {
    throw Error("Messages error");
  }

  return message;
};

module.exports = {
  getMessagesBetweenUsers,
  createNewMessage,
};
