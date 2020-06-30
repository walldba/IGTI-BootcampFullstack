import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    const accounts = await accountsModel.find({});
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default app;
