const express = require("express");
const cors = require("cors");
const { userCreateSchema } = require("./scheams");

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    login: "admin",
    password: "admin",
    fullName: "admin",
  },
  {
    id: 2,
    login: "admin1",
    password: "admin",
    fullName: "Admin Ok",
  },
];

app.get("/api/users", (req, res) => {
  res.json({ stausCode: 200, message: "ok", data: users });
});

app.post("/api/users", (req, res) => {
  const dto = req.body;

  const { error } = userCreateSchema.validate(dto);

  if (error) {
    return res.status(400).json({ stausCode: 400, message: error.message });
  }

  const newUser = {
    id: users[users.length - 1].id + 1,
    login: dto.login,
    password: dto.password,
    fullName: dto.fullName,
  };

  users.push(newUser);

  res.status(201).json({ stausCode: 201, message: "created", data: newUser });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
