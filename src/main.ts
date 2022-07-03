import dotenv from "dotenv";
import express from "express";
import { covidRouter } from "./routers/router";
import mongoose from "mongoose";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use("/covid", covidRouter);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("database connected");
    app.listen(3000, () => console.log(`runnin`));
  } catch (e) {
    console.log(e);
  }
}

start();
