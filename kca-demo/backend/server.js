const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

const { MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb-0.mongodb:27017/${MONGO_DB}?authSource=admin`;

mongoose.connect(mongoURL);

const DataSchema = new mongoose.Schema({
  col1: String,
  col2: String,
  col3: String,
  col4: String,
  col5: String
});

const Data = mongoose.model("Data", DataSchema, "data");

app.get("/", async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.listen(3000, () => console.log("Backend running"));
