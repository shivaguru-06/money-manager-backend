const Account = require("../models/Account");


exports.getAccounts = async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
};

exports.transferMoney = async (req, res) => {
  const { from, to, amount } = req.body;

  const fromAcc = await Account.findOne({ name: from });
  const toAcc = await Account.findOne({ name: to });

  if (!fromAcc || !toAcc) {
    return res.status(404).json({ message: "Account not found" });
  }

  if (fromAcc.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  fromAcc.balance -= amount;
  toAcc.balance += amount;

  await fromAcc.save();
  await toAcc.save();

  res.json({ message: "Transfer successful" });
};
