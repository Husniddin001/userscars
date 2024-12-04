const express = require("express");
const cors = require("cors");
const app = express();
const port = 7777;
const { carCreateScheam, createUserScheam } = require("./scheams");
const axios = require("axios");

const cars = [
  {
    id: 1,
    model: "Toyota",
  },
  {
    id: 2,
    model: "BMW",
  },
];

app.use(cors());
app.use(express.json());

app.get("/api/cars", (req, res) => {
  res.status(200).json({ statusCode: 200, message: "ok", data: cars });
});

app.post("/api/cars", (req, res) => {
  const dto = req.body;

  const { error } = carCreateScheam.validate(dto);

  if (error) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Bad Request", data: error.message });
  }

  const newCar = {
    id: cars[cars.length - 1].id + 1,
    model: dto.model,
  };

  cars.push(newCar);

  res.status(201).json({ statusCode: 201, message: "ok", data: newCar });
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/users");

    res
      .status(200)
      .json({ statusCode: 200, message: "ok", data: response.data });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

app.post("/api/create-user", async (req, res) => {
  try {
    const dto = req.body;

    const { error } = createUserScheam.validate(dto);

    if (error) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Bad Request", data: error.message });
    }

    const response = await axios.post("http://localhost:3000/api/users", dto);

    res
      .status(201)
      .json({ statusCode: 201, message: "ok", data: response.data });
  } catch (error) {
    const statusCode = error.status || 500;

    res.status(statusCode).json({
      statusCode: statusCode,
      message: error.response?.data?.message || error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
