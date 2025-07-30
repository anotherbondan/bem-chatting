const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userController = require("./user/user.controller");
const messageController = require("./message/message.controller");
const prisma = require("./db");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://bem-chatting-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json());

// Semua user routes
app.use("/users", userController);
app.use("/messages", messageController);

async function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send("Missing or invalid Authorization header");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).send("Invalid credentials");
    }

    req.user = username;
    next();
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
}

app.post("/login", cors(), basicAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.user },
      select: { id: true, username: true },
    });

    res.send({
      message: `Welcome, ${req.user}`,
      user,
    });
  } catch (err) {
    console.error("Fetch user ID error:", err);
    res.status(500).send("Internal server error");
  }
});

// Server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
