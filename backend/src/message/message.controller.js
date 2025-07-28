const express = require("express");
const {
  getMessagesBetweenUsers,
  createNewMessage,
} = require("./message.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
    return res
      .status(400)
      .json({ message: "Sender and receiver are required" });
  }

  try {
    const messages = await getMessagesBetweenUsers(senderId, receiverId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMessageData = req.body;

    const message = await createNewMessage(
      newMessageData.senderId,
      newMessageData.receiverId,
      newMessageData.text
    );
    res.send({ data: message, message: "message sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
