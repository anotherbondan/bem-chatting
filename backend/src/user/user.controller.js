const {
  getAllUsers,
  getUserById,
  createNewUser,
  getContacts,
  getContactById,
} = require("./user.service");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({ data: users, message: "users retrieved succesfully" });
});

router.get("/:id", async (req, res) => {
  const userId = String(req.params.id);
  try {
    const user = await getUserById(userId);
    res.send({ data: user, message: "user retrieved successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id/contacts", async (req, res) => {
  const userId = String(req.params.id);
  const contactId = req.query.contactId?.toString();
  try {
    if (contactId) {
      const contact = await getContactById(userId, contactId);
      res.send({ data: contact, message: "contact retrieved successfully" });
    } else {
      const contacts = await getContacts(userId);
      res.send({ data: contacts, message: "contacts retrieved successfully" });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, profileName, phoneNumber } = req.body;
    const account = await createNewUser(
      username,
      password,
      profileName,
      phoneNumber
    );
    res.send({ data: account, message: "registration success" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
