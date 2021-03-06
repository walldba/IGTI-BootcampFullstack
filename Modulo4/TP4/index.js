import express from "express";
import dbConnect from "./dbConnect.js";

import accountsRoutes from "./routes/accountsRoutes.js";

const port = process.env.PORT;
const app = express();
dbConnect();

app.use(express.json());
app.use("/accounts", accountsRoutes);

app.listen(port, () => console.log(`API Node Started On Port ${port}`));
