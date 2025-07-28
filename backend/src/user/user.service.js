const { findLastMessageBetweenUser } = require("../message/message.repository");
const {
  findUserById,
  findAllUsers,
  createUser,
  findContacts,
  findContactById,
} = require("./user.repository");

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw Error("User not found");
  }

  return user;
};

const createNewUser = async (username, password, profileName, phoneNumber) => {
  const newUser = await createUser(
    username,
    password,
    profileName,
    phoneNumber
  );

  return newUser;
};

const getContacts = async (ownerId) => {
  await getUserById(ownerId);

  const contacts = await findContacts(ownerId);

  if (!contacts) {
    throw Error("Contact not found");
  }

  const enhancedContacts = await Promise.all(
    contacts.map(async (contact) => {
      const user = await findUserById(contact.contactId);
      const lastMessage = await findLastMessageBetweenUser(
        ownerId,
        contact.contactId
      );

      return {
        ...contact,
        profilePicture:
          user?.profilePicture ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s",
        lastChatMessage: lastMessage?.text ?? null,
        lastChatTime: lastMessage
          ? new Date(lastMessage.timestamp).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
      };
    })
  );

  return enhancedContacts;
};

const getContactById = async (ownerId, contactId) => {
  const contacts = await getContacts(ownerId);

  const contact = contacts.find(
    (c) => String(c.contactId) === String(contactId)
  );

  if (!contact) {
    throw Error("Contact not found");
  }

  return contact;
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  getContacts,
  getContactById,
};
