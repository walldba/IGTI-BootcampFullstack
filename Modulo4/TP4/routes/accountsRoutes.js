import express from "express";
import * as accountsController from "../controllers/accountsController.js";

const router = express.Router();

router.get("/showAll", accountsController.showAll);

router.patch("/deposit", accountsController.deposit);

router.patch("/withdraw", accountsController.withdraw);

router.get("/balance/", accountsController.balance);

router.delete("/deleteAccount", accountsController.deleteAccount);

router.post("/transfer", accountsController.transfer);

export default router;
