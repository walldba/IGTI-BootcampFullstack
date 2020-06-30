import express from "express";
import mongoose from "mongoose";
import { accountsModel } from "./models/accountsModel.js";

const port = 3000;
const app = express();
app.use(express.json());

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://walldba:linkin01@cursoigti.uefer.azure.mongodb.net/Curso?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log("Erro ao conectar no MongoDB");
  }
})();

app.get("/", async (req, res) => {
  try {
    const accounts = await accountsModel.find({});
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.listen(port, () => console.log(`API Started On Port ${port}`));
