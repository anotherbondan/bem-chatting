const prisma = require("../db/index");

const findAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

const createUser = async (username, password, profileName, phoneNumber) => {
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      profileName,
      phoneNumber,
    },
  });

  return newUser;
};

const findContacts = async (ownerId) => {
  const contacts = await prisma?.contact.findMany({
    where: {
      ownerId,
    },
  });

  return contacts;
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  findContacts,
};
