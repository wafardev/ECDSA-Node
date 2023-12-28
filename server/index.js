const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x4704aebc55840d8ade57ae8d0da42ed940263eea": 100,
  "0xc8567375016919b31ebb1df948fe17d3d9e15579": 50,
  "0x2d05edc88918ebd21d37638f85c807baccb054a2": 75,
};

/* Wallets: 
1. Private Key: 0xf1a80c7a71130dd9ce8973755a731f6de46cb1b65e9ac33f5d3e52b81efffd98
Public Key: 0x04ba348254d9e25b96495e382e2a99bb456ce2b484a3b42605ca0a7ace8a3ad8652a0cb06e93f001447e884f97f78a8d05c1f02f9f290c2060dd5965e46e6be59d
Eth Address: 0x4704aebc55840d8ade57ae8d0da42ed940263eea

2. Private Key: 0xd7f7ab00d970c654a2345c8437beb834a44f0322c6a570ceee4b7fa2feb4a08f
Public Key: 0x04435e34d8f653f129893c884860f6cdca1f4f8337cd5475df7a5a3cbe7baf8b09a599bb2f62636f5685bc904bc7bcf25c49b54e439ef4c9d528e5c350b511260d
Eth Address: 0xc8567375016919b31ebb1df948fe17d3d9e15579

3. Private Key: 0x8f25ac13eeb833ab67bfdfb2db63429dfa5664d46a8b3db37a4156041d8a2b54
Public Key: 0x046e84643d3413cf3fee25eea9f639fe0bdd05f57849af430fa5d54bfdf6c3f593269d712a26de774adb688382483033afa7e09b64baf7aa5dc040339d480080cb
Eth Address: 0x2d05edc88918ebd21d37638f85c807baccb054a2 */

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
