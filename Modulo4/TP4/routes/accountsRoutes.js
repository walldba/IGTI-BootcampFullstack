import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const router = express.Router();

router.patch("/deposit", async (req, res) => {
  try {
    const { agencia, conta, deposito } = req.body;

    const account = await accountsModel.findOne({ agencia, conta });

    if (!account) res.status(400).send("Conta não encontrada!");

    account.balance += deposito;

    await account.save();

    res.send({
      name: account.name,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/withdraw", async (req, res) => {
  try {
    const { agencia, conta, saque } = req.body;

    const account = await accountsModel.findOne({ agencia, conta });

    if (!account) res.status(400).send("Conta não encontrada!");
    if (saque === undefined) res.status(400).send("Valor de saque inválido");

    const newBalance = account.balance - (saque + 1);

    if (newBalance < 0) res.status(400).send("Saldo insuficiente!");

    account.balance = newBalance;

    await account.save();

    res.send({
      name: account.name,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/balance/", async (req, res) => {
  try {
    const { agencia, conta } = req.query;

    const account = await accountsModel.findOne({ agencia, conta });

    if (!account) res.status(400).send("Conta não encontrada!");

    res.send({
      name: account.name,
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/deleteAccount", async (req, res) => {
  try {
    const { agencia, conta } = req.query;

    const account = await accountsModel.findOneAndRemove({ agencia, conta });

    if (!account) res.status(400).send("Conta não encontrada!");

    const totalAccounts = await accountsModel.count({ agencia });

    res.send({
      contasAtivas: totalAccounts,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/transfer", async (req, res) => {
  try {
    const { contaOrigem, contaDestino, valor } = req.body;

    const accountOrigem = await accountsModel.findOne({ conta: contaOrigem });

    if (!accountOrigem) {
      res.status(400).send("Conta de Origem não encontrada!");
    }

    const accountDestino = await accountsModel.findOne({ conta: contaDestino });

    if (!accountDestino) {
      res.status(400).send("Conta de Origem não encontrada!");
    }

    let valorDebito = valor;

    if (accountOrigem.agencia !== accountDestino.agencia) {
      valorDebito += 8;
    }

    if (accountOrigem.balance - valorDebito < 0) {
      res.status(400).send("Saldo da Conta de Origem insuficiente!");
    }

    accountOrigem.balance -= valorDebito;
    accountDestino.balance += valor;

    await accountOrigem.save();
    await accountDestino.save();

    res.send({
      name: accountOrigem.name,
      balance: accountOrigem.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
