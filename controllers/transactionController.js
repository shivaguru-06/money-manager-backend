const Transaction = require("../models/Transaction");
const Account = require("../models/Account");


exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

    const account = await Account.findOne({ name: req.body.account });
    if (account) {
      account.balance += req.body.type === "income"
        ? req.body.amount
        : -req.body.amount;
      await account.save();
    }

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTransactions = async (req, res) => {
  const { startDate, endDate, category, division } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (division) filter.division = division;

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
  res.json(transactions);
};


exports.updateTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const diffHours =
    (Date.now() - transaction.createdAt.getTime()) / (1000 * 60 * 60);

  if (diffHours > 12) {
    return res.status(403).json({ message: "Edit time expired" });
  }

  Object.assign(transaction, req.body);
  await transaction.save();

  res.json(transaction);
};


exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
};
